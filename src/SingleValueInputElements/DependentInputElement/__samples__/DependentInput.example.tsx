import * as React from 'react';
import { IDropdownOption, PrimaryButton } from 'office-ui-fabric-react';
import DependentInputElementInitializer from '../DependentInputElementInitializer';
import DropdownInput from '../../DropdownInputElement/DropdownInput';
import IDropdownInputProps from '../../DropdownInputElement/IDropdownInputProps';
import ISingleValueInputElement from '../../ISingleValueInputElement';
import { IValueInputElement } from '../../../IValueInputElement';
import SingleValueInputElement from '../../SingleValueInputElement';

export default class DependentInputSample extends React.Component {
    private _principalInput: IValueInputElement<string>;

    private _dependentInput: ISingleValueInputElement<string, IDropdownInputProps>;

    public constructor(props: unknown) {
        super(props);

        const options: Array<string> = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._principalInput = new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true, label: 'Principal dropdown (required, without error handling)' },
            DropdownInput,
            {
                options: options.map(
                    (o): IDropdownOption => {
                        return {
                            key: o,
                            text: o
                        };
                    }
                ),
                placeholder: 'When you change the value, the dependent dropdown will appear.'
            },
            (): void => this.forceUpdate()
        );

        this._dependentInput = new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true, label: 'Dependent dropdown (required, without error handling)' },
            DropdownInput,
            {
                placeholder:
                    'When you change the value, the button will become enabled and this message will disappear.'
            },
            (): void => this.forceUpdate()
        );

        DependentInputElementInitializer.initializeDependency(
            this._principalInput,
            this._dependentInput,
            (newPrincipalValue: string, doneCallback: () => void): void => {
                const dependentOptions: Array<string> = [];
                for (let i = 0; i < 10; i++) dependentOptions.push(newPrincipalValue + i);

                this._dependentInput.componentProps.options = dependentOptions.map(
                    (o): IDropdownOption => {
                        return {
                            key: o,
                            text: o
                        };
                    }
                );

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

    private printValues = (): void => {
        console.log('Principal value: ' + this._principalInput.value);
        console.log('Dependent value: ' + this._dependentInput.value);
    };
}
