import * as React from 'react';
import { ITimePickerProps, IValueInputElement, SingleValueInputElement, TimePicker } from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';

export default class TimePickerSample extends React.Component {
    private _timePicker: IValueInputElement<Date>;

    public constructor(props: unknown) {
        super(props);

        this._timePicker = new SingleValueInputElement<Date, ITimePickerProps>(
            { isRequired: true, label: 'Basic time picker input without validation (required, without error handling)' },
            TimePicker,
            { placeholder: 'When you select a date, the button will become enabled.' },
            (): void => this.forceUpdate()
        );
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-text-input">
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
