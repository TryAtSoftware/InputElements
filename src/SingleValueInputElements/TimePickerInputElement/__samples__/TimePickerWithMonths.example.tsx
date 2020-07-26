import * as React from 'react';
import { ITimePickerProps, IValueInputElement, SingleValueInputElement, TimePicker } from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';

export default class TimePickerWithMonthsSample extends React.Component {
    private _timePicker: IValueInputElement<Date>;

    public constructor(props: unknown) {
        super(props);

        this._timePicker = new SingleValueInputElement<Date, ITimePickerProps>(
            {
                isRequired: true,
                label:
                    'Time picker input without validation that allows you more easily to select a month (required, without error handling)'
            },
            TimePicker,
            { placeholder: 'When you select a date, the button will become enabled.', showMonthPicker: true, showGoToToday: true },
            (): void => {
                this.forceUpdate();
                console.log(this._timePicker.value);
            }
        );
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group time-picker-with-months-input">
                {this._timePicker.render()}
                <PrimaryButton
                    text="Submit"
                    disabled={!this._timePicker.isValid}
                    onClick={(): void => console.log(this._timePicker.value)}
                />
            </div>
        );
    }
}
