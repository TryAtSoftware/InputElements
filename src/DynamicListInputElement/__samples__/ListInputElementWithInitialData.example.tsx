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
import { Checkbox, PrimaryButton } from 'office-ui-fabric-react';

interface IListInputElementWithInitialDataSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class ListInputElementWithInitialDataSample extends React.Component<unknown, IListInputElementWithInitialDataSampleState> {
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

        this._inputElement.setInitialValue([{ value: 'unexisting data', inputCreationCallback: this.createDropdown }]);

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
                <Checkbox label="Is valid" checked={this.state.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this.state.hasChanges} disabled={true} />
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
