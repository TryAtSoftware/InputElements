import * as React from 'react';
import {
    DropdownInput,
    IDropdownInputOption,
    IDropdownInputProps,
    IValueInputElement,
    SingleValueInputElement,
    UpdateCallback
} from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';

interface IDropdownInputSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class DropdownInputSample extends React.Component<unknown, IDropdownInputSampleState> {
    private _dropdownInput: IValueInputElement<string>;

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._dropdownInput = new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true, label: 'Basic dropdown input (required, without error handling)' },
            DropdownInput,
            {
                options: options.map(
                    (o): IDropdownInputOption => {
                        return {
                            key: o,
                            text: o
                        };
                    }
                ),
                placeholder: 'When you change the value, the button will become enabled and this message will disappear.'
            },
            this.updateForm
        );

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
            </div>
        );
    }
}
