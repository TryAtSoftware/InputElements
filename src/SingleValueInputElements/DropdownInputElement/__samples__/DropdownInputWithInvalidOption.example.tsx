import {
    DropdownInputElement,
    IBaseInputElementProps,
    IDropdownInputOption,
    IDropdownInputProps,
    ISingleValueInputElement,
    UpdateCallback
} from '@try-at-software/input-elements';
import { Checkbox, PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';

interface IDropdownInputWithInvalidOptionSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class DropdownInputWithInvalidOptionSample extends React.Component<unknown, IDropdownInputWithInvalidOptionSampleState> {
    private _dropdownInput: ISingleValueInputElement<string, IBaseInputElementProps, IDropdownInputProps>;

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._dropdownInput = new DropdownInputElement(
            {
                isRequired: true,
                renderRequiredIndicator: true,
                label: 'Dropdown input with invalid initial value (required, with error handling)',
                renderErrors: true
            },
            { placeholder: 'Choose any value' },
            this.updateForm
        );

        this._dropdownInput.changeDynamicProps({
            options: options.map(
                (o): IDropdownInputOption => {
                    return {
                        key: o,
                        text: o
                    };
                }
            )
        });

        this._dropdownInput.setInitialValue('invalid_value');

        this.state = {
            isValid: this._dropdownInput.isValid,
            hasChanges: this._dropdownInput.hasChanges
        };
    }

    private updateForm: UpdateCallback = (): void => {
        if (this._dropdownInput.isValid === this.state.isValid && this._dropdownInput.hasChanges === this.state.hasChanges) return;

        this.setState({
            isValid: this._dropdownInput.isValid,
            hasChanges: this._dropdownInput.hasChanges
        });
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-dropdown-input">
                {this._dropdownInput.render()}
                <PrimaryButton
                    text="Submit"
                    disabled={!this.state.isValid || !this.state.hasChanges}
                    onClick={(): void => console.log(this._dropdownInput.value)}
                />
                <Checkbox label="Is valid" checked={this.state.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this.state.hasChanges} disabled={true} />
            </div>
        );
    }
}
