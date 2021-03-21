import {
    DropdownInput,
    DynamicListInputElement,
    IDropdownInputOption,
    IDropdownInputProps,
    IDynamicListInputElement,
    ISingleValueInputElement,
    ITextInputProps,
    restrictValidPath,
    SingleValueInputElement,
    TextInput,
    UpdateCallback
} from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';

interface IListInputElementSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class MultipleOptionsListInputElementSample extends React.Component<unknown, IListInputElementSampleState> {
    private _inputElement: IDynamicListInputElement<string>;

    public constructor(props: unknown) {
        super(props);

        this._inputElement = new DynamicListInputElement(
            {
                isRequired: true,
                canInsertValues: true,
                canRemoveValues: true,
                canRemoveAllInputs: true
            },
            [
                {
                    name: 'Dropdown',
                    icon: 'Dropdown',
                    createInput: this.createDropdown
                },
                {
                    name: 'Text field',
                    icon: 'TextField',
                    createInput: this.createTextField
                }
            ],
            this.updateForm
        );

        this.state = {
            isValid: this._inputElement.isValid,
            hasChanges: this._inputElement.hasChanges
        };
    }

    private updateForm: UpdateCallback = (): void => {
        if (this._inputElement.isValid === this.state.isValid && this._inputElement.hasChanges === this.state.hasChanges) return;

        this.setState({
            isValid: this._inputElement.isValid,
            hasChanges: this._inputElement.hasChanges
        });
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group dynamic-list-input-element">
                {this._inputElement.render()}
                <PrimaryButton text="Submit" disabled={!this._inputElement.isValid} onClick={this.printValues} />
            </div>
        );
    }

    private createDropdown = (): ISingleValueInputElement<string> => {
        const options: string[] = [];

        for (let i = 0; i < 15; i++) options.push(i.toString());

        return new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true },
            DropdownInput,
            {
                options: options.map(
                    (o): IDropdownInputOption => {
                        return { key: o, text: o };
                    }
                ),
                placeholder: 'Choose any value'
            },
            this.updateForm
        );
    };

    private createTextField = (): ISingleValueInputElement<string> => {
        return new SingleValueInputElement<string, ITextInputProps>(
            { isRequired: true, renderErrors: true },
            TextInput,
            {
                placeholder: 'Write any value'
            },
            this.updateForm,
            restrictValidPath()
        );
    };

    private printValues = (): void => {
        console.log(this._inputElement.value);
    };
}
