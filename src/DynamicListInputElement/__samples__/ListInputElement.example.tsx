import * as React from 'react';
import DropdownInput from '../../SingleValueInputElements/DropdownInputElement/DropdownInput';
import DynamicListInputElement from '../DynamicListInputElement';
import IDropdownInputOption from '../../SingleValueInputElements/DropdownInputElement/IDropdownInputOption';
import IDropdownInputProps from '../../SingleValueInputElements/DropdownInputElement/IDropdownInputProps';
import IDynamicListInputElement from '../IDynamicListInputElement';
import ISingleValueInputElement from '../../SingleValueInputElements/ISingleValueInputElement';
import { PrimaryButton } from 'office-ui-fabric-react';
import SingleValueInputElement from '../../SingleValueInputElements/SingleValueInputElement';
import { UpdateCallback } from '../../IInputElement';

export default class ListInputElementSample extends React.Component {
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
    }

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

    private updateForm: UpdateCallback = (): void => {
        this.forceUpdate();
    };

    private printValues = (): void => {
        console.log(this._inputElement.value);
    };
}
