import * as React from 'react';
// import {
//     DropdownInput,
//     IDropdownInputOption,
//     IDropdownInputProps,
//     ISingleValueInputElement,
//     SingleValueInputElement,
//     UpdateCallback
// } from '@try-at-software/input-elements';
import { Checkbox, PrimaryButton } from 'office-ui-fabric-react';
import { IInputElement, UpdateCallback } from '../../../IInputElement';
import { getFormState } from '../../../Utilities/FormHelper';
import { DropdownInput, IDropdownInputOption, IDropdownInputProps } from '../../DropdownInputElement';
import { ISingleValueInputElement } from '../../ISingleValueInputElement';
import { SingleValueInputElement } from '../../SingleValueInputElement';

interface IDependentInputSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class DependentInputSample extends React.Component<unknown, IDependentInputSampleState> {
    private readonly _principalInput: ISingleValueInputElement<string, IDropdownInputProps>;
    private readonly _dependentInput: ISingleValueInputElement<string, IDropdownInputProps>;
    private readonly _allInputs: IInputElement[];

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        const x = new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true, label: 'Principal dropdown (required, without error handling)' },
            DropdownInput,
            {
                options: this.mapToDropdownOptions(options),
                placeholder: 'When you change the value, the dependent dropdown will appear.'
            },
            this.updateForm
        );
        this._principalInput = x;

        const y = new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true, label: 'Dependent dropdown (required, without error handling)' },
            DropdownInput,
            {
                placeholder: 'When you change the value, the button will become enabled and this message will disappear.'
            },
            this.updateForm
        );
        this._dependentInput = y;

        this._allInputs = [this._principalInput, this._dependentInput];

        x.subscribeToValueChange((newPrincipalValue: string): void => {
            if (!y.isVisible) y.show();

            const dependentOptions: string[] = [];
            for (let i = 0; i < 10; i++) dependentOptions.push(newPrincipalValue + i);

            y.componentProps.options = this.mapToDropdownOptions(dependentOptions);
            y.resetValue();
        });
        x.subscribeToInvalidValueChange((): void => {
            if (y.isVisible) y.hide();
        });
        y.hide();

        const initialFormStatus = getFormState(this._allInputs);
        this.state = {
            ...initialFormStatus
        };
    }

    private updateForm: UpdateCallback = (): void => {
        const formStatus = getFormState(this._allInputs);
        if (formStatus.isValid === this.state.isValid && formStatus.hasChanges === this.state.hasChanges) return;

        this.setState({
            isValid: formStatus.isValid,
            hasChanges: formStatus.hasChanges
        });
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-dropdown-input">
                {this._principalInput.render()}
                {this._dependentInput.render()}
                <PrimaryButton text="Submit" disabled={!this._dependentInput.isValid} onClick={this.printValues} />
                <Checkbox label="Is valid" checked={this.state.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this.state.hasChanges} disabled={true} />
            </div>
        );
    }

    private printValues = (): void => {
        console.log('Principal value: ' + this._principalInput.value);
        console.log('Dependent value: ' + this._dependentInput.value);
    };

    private mapToDropdownOptions(values: string[]): IDropdownInputOption[] {
        if (!values || !Array.isArray(values)) return [];

        return values
            .filter((x): boolean => !!x)
            .map(
                (o): IDropdownInputOption => {
                    return {
                        key: o,
                        text: o
                    };
                }
            );
    }
}
