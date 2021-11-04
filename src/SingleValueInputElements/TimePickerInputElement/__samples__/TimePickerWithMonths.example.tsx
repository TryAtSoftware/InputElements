import * as React from 'react';
import { ITimePickerProps, IValueInputElement, SingleValueInputElement, TimePicker, UpdateCallback } from '@try-at-software/input-elements';
import { PrimaryButton } from '@fluentui/react';

interface ITimePickerWithMonthsSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class TimePickerWithMonthsSample extends React.Component<unknown, ITimePickerWithMonthsSampleState> {
    private _timePicker: IValueInputElement<Date>;

    public constructor(props: unknown) {
        super(props);

        this._timePicker = new SingleValueInputElement<Date, ITimePickerProps>(
            {
                isRequired: true,
                renderRequiredIndicator: true,
                label: 'Time picker input without validation that allows you more easily to select a month (required, without error handling)'
            },
            TimePicker,
            {
                placeholder: 'When you select a date, the button will become enabled.',
                showMonthPicker: true,
                showGoToToday: true
            },
            this.updateForm
        );

        this.state = {
            isValid: this._timePicker.isValid,
            hasChanges: this._timePicker.hasChanges
        };
    }

    private updateForm: UpdateCallback = (): void => {
        if (this._timePicker.isValid === this.state.isValid && this._timePicker.hasChanges === this.state.hasChanges) return;

        this.setState({
            isValid: this._timePicker.isValid,
            hasChanges: this._timePicker.hasChanges
        });
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group time-picker-with-months-input">
                {this._timePicker.render()}
                <PrimaryButton
                    text="Submit"
                    disabled={!this.state.isValid || !this.state.hasChanges}
                    onClick={(): void => console.log(this._timePicker.value)}
                />
            </div>
        );
    }
}
