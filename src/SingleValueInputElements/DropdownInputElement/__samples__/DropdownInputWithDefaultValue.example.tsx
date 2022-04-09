import {
    DropdownInput,
    IBaseInputElementProps,
    IDropdownInputOption,
    IDropdownInputProps,
    ISingleValueInputElement,
    SingleValueInputElement,
    UpdateCallback
} from '@try-at-software/input-elements';
import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';

interface IDropdownInputWithDefaultValueSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class DropdownInputWithDefaultValueSample extends React.Component<unknown, IDropdownInputWithDefaultValueSampleState> {
    private _dropdownInput: ISingleValueInputElement<string, IBaseInputElementProps, IDropdownInputProps>;
    private readonly _defaultOption: IDropdownInputOption = {
        key: 'default',
        text: 'Please select a given option'
    };

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._dropdownInput = new SingleValueInputElement<string, IBaseInputElementProps, IDropdownInputProps>(
            {
                isRequired: true,
                renderRequiredIndicator: true,
                label: 'Dropdown input with default selected value (required, without error handling)'
            },
            DropdownInput,
            {
                placeholder: 'When you change the value, the button will become enabled and this message will disappear.'
            },
            this.updateForm,
            (selectedKey: string): string => {
                if (selectedKey === this._defaultOption.key) return 'You should select any other value but the default one';

                return '';
            }
        );

        this._dropdownInput.changeDynamicProps({
            defaultOption: this._defaultOption,
            options: options.map((o): IDropdownInputOption => {
                return {
                    key: o,
                    text: o
                };
            })
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
            <div className="sample-group dropdown-input-with-default-value">
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
