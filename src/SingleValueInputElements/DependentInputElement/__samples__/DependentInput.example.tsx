import * as React from 'react';
import DependentInputElementInitializer from '../DependentInputElementInitializer';
import DropdownInput from '../../DropdownInputElement/DropdownInput';
import IDropdownInputOption from '../../DropdownInputElement/IDropdownInputOption';
import IDropdownInputProps from '../../DropdownInputElement/IDropdownInputProps';
import ISingleValueInputElement from '../../ISingleValueInputElement';
import { PrimaryButton } from 'office-ui-fabric-react';
import SingleValueInputElement from '../../SingleValueInputElement';
import { UpdateCallback } from '../../../IInputElement';

export default class DependentInputSample extends React.Component {
    private _principalInput: ISingleValueInputElement<string, IDropdownInputProps>;

    private _dependentInput: ISingleValueInputElement<string, IDropdownInputProps>;

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._principalInput = new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true, label: 'Principal dropdown (required, without error handling)' },
            DropdownInput,
            {
                options: this.mapToDropdownOptions(options),
                placeholder: 'When you change the value, the dependent dropdown will appear.'
            },
            this.updateForm
        );

        this._dependentInput = new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true, label: 'Dependent dropdown (required, without error handling)' },
            DropdownInput,
            {
                placeholder:
                    'When you change the value, the button will become enabled and this message will disappear.'
            },
            this.updateForm
        );

        DependentInputElementInitializer.initializeDependency(
            this._principalInput,
            this._dependentInput,
            (newPrincipalValue: string, doneCallback: () => void): void => {
                const dependentOptions: string[] = [];
                for (let i = 0; i < 10; i++) dependentOptions.push(newPrincipalValue + i);

                this._dependentInput.componentProps.options = this.mapToDropdownOptions(dependentOptions);

                doneCallback();
            }
        );
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-dropdown-input">
                {this._principalInput.render()}
                {this._dependentInput.render()}
                <PrimaryButton text="Submit" disabled={!this._dependentInput.isValid} onClick={this.printValues} />
            </div>
        );
    }

    private updateForm: UpdateCallback = (): void => {
        this.forceUpdate();
    };

    private printValues = (): void => {
        console.log('Principal value: ' + this._principalInput.value);
        console.log('Dependent value: ' + this._dependentInput.value);
    };

    private mapToDropdownOptions(values: string[]): IDropdownInputOption[] {
        return values
            ?.filter((x): boolean => !!x)
            ?.map(
                (o): IDropdownInputOption => {
                    return {
                        key: o,
                        text: o
                    };
                }
            );
    }
}
