import * as React from 'react';
import {
    DropdownInput,
    DynamicListInputElement,
    IDropdownInputOption,
    IDropdownInputProps,
    IDynamicListInputElement,
    ISingleValueInputElement,
    SingleValueInputElement,
    UpdateCallback
} from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';

interface IListInputElementSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class ListInputElementSample extends React.Component<unknown, IListInputElementSampleState> {
    private _inputElement: IDynamicListInputElement<string>;

    public constructor(props: unknown) {
        super(props);

        this._inputElement = new DynamicListInputElement(
            {
                isRequired: true,
                canInsertValues: false,
                canRemoveValues: true,
                canRemoveAllInputs: true
            },
            [
                {
                    name: 'Dropdown',
                    icon: 'Dropdown',
                    createInput: this.createDropdown
                }
            ],
            this.updateForm
        );

        this.state = {
            isValid: this._inputElement.isValid,
            hasChanges: this._inputElement.hasChanges
        };
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group dynamic-list-input-element">
                {this._inputElement.render()}
                <PrimaryButton text="Submit" disabled={!this.state.isValid || !this.state.hasChanges} onClick={this.printValues} />
            </div>
        );
    }

    private updateForm: UpdateCallback = (): void => {
        if (this._inputElement.isValid === this.state.isValid && this._inputElement.hasChanges === this.state.hasChanges) return;

        this.setState({
            isValid: this._inputElement.isValid,
            hasChanges: this._inputElement.hasChanges
        });
    };

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

    private printValues = (): void => {
        console.log(this._inputElement.value);
    };
}
