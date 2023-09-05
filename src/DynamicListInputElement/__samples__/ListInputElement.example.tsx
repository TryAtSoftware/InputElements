import { DynamicListInputElement, IDynamicListInputElement, UpdateCallback } from '@try-at-software/input-elements';
import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';
import { createDropdown } from './DynamicListInputElementSamplesHelper';

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
                    createInput: createDropdown(this.updateForm)
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

    private printValues = (): void => {
        console.log(this._inputElement.value);
    };
}
