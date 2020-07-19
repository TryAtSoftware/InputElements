import * as React from 'react';
import DropdownInput from '../../SingleValueInputElements/DropdownInputElement/DropdownInput';
import DynamicListInputElement from '../DynamicListInputElement';
import IDropdownInputProps from '../../SingleValueInputElements/DropdownInputElement/IDropdownInputProps';
import { IDropdownOption } from 'office-ui-fabric-react';
import IDynamicListInputElement from '../IDynamicListInputElement';
import ISingleValueInputElement from '../../SingleValueInputElements/ISingleValueInputElement';
import SingleValueInputElement from '../../SingleValueInputElements/SingleValueInputElement';
import { UpdateCallback } from '../../IInputElement';

export default class ListInputElementSample extends React.Component {
    private _inputElement: IDynamicListInputElement<string>;

    public constructor(props: unknown) {
        super(props);

        const initialListElement = this.createDropdown();

        this._inputElement = new DynamicListInputElement(
            initialListElement,
            [
                {
                    name: 'default',
                    icon: 'Car',
                    createInput: this.createDropdown
                }
            ],
            this.updateForm
        );
    }

    public render(): JSX.Element {
        return <div className="sample-group dynamic-list-input-element">{this._inputElement.render()}</div>;
    }

    private createDropdown = (): ISingleValueInputElement<string> => {
        const options: string[] = [];

        for (let i = 0; i < 20; i++) options.push(i.toString());

        return new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true },
            DropdownInput,
            {
                options: options.map(
                    (o): IDropdownOption => {
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
}
