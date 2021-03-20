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

interface IDropdownInputWithDefaultValueSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class DropdownInputWithDefaultValueSample extends React.Component<unknown, IDropdownInputWithDefaultValueSampleState> {
    private _dropdownInput: IValueInputElement<string>;

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        const defaultKey = 'default';
        this._dropdownInput = new SingleValueInputElement<string, IDropdownInputProps>(
            {
                renderErrors: true,
                isRequired: true,
                label: 'Dropdown input with default selected value (required, without error handling)'
            },
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
                defaultOption: {
                    key: defaultKey,
                    text: 'Please select a given option'
                }
            },
            this.updateForm,
            (selectedKey: string): string => {
                if (selectedKey === defaultKey) return 'You should select any other value but the default one';

                return '';
            }
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
