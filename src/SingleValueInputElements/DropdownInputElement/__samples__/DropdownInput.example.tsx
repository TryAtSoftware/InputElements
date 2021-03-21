import {
    DropdownInputElement,
    IBaseInputElementProps,
    IDropdownInputOption,
    IDropdownInputProps,
    ISingleValueInputElement,
    UpdateCallback
} from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';

interface IDropdownInputSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class DropdownInputSample extends React.Component<unknown, IDropdownInputSampleState> {
    private _dropdownInput: ISingleValueInputElement<string, IBaseInputElementProps, IDropdownInputProps>;

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._dropdownInput = new DropdownInputElement(
            { isRequired: true, renderRequiredIndicator: true, label: 'Basic dropdown input (required, without error handling)' },
            {
                placeholder: 'When you change the value, the button will become enabled and this message will disappear.'
            },
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
