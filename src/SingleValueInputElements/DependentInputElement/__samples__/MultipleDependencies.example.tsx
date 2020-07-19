import * as React from 'react';
import DependentInputElementInitializer from '../DependentInputElementInitializer';
import DropdownInput from '../../DropdownInputElement/DropdownInput';
import IDropdownInputOption from '../../DropdownInputElement/IDropdownInputOption';
import IDropdownInputProps from '../../DropdownInputElement/IDropdownInputProps';
import ISingleValueInputElement from '../../ISingleValueInputElement';
import { PrimaryButton } from 'office-ui-fabric-react';
import SingleValueInputElement from '../../SingleValueInputElement';
import { UpdateCallback } from '../../../IInputElement';

export default class MultipleDependenciesSample extends React.Component {
    private _principalInput: ISingleValueInputElement<string, IDropdownInputProps>;

    private _dependentInputs: ISingleValueInputElement<string, IDropdownInputProps>[] = [];

    public constructor(props: unknown) {
        super(props);

        const dependentElementsCount = 5;
        const options: Array<string> = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._principalInput = new SingleValueInputElement<string, IDropdownInputProps>(
            {
                isRequired: true,
                label: 'Principal dropdown with multiple dependencies (required, without error handling)'
            },
            DropdownInput,
            {
                options: this.mapToDropdownOptions(options),
                placeholder: 'When you change the value, the dependent dropdown will appear.'
            },
            this.updateForm
        );

        for (let i = 0; i < dependentElementsCount; i++) {
            const currentDependentInput = new SingleValueInputElement<string, IDropdownInputProps>(
                { isRequired: false, label: `Dependent dropdown #${i + 1} (not required, without error handling)` },
                DropdownInput,
                {
                    placeholder: 'None of all dependent input elements is required, so the button is already enabled.'
                },
                this.updateForm
            );

            DependentInputElementInitializer.initializeDependency(
                this._principalInput,
                currentDependentInput,
                (newPrincipalValue: string, doneCallback: () => void): void => {
                    const dependentOptions: Array<string> = [];
                    for (let i = 0; i < 10; i++) dependentOptions.push(newPrincipalValue + i);

                    currentDependentInput.componentProps.options = this.mapToDropdownOptions(dependentOptions);

                    doneCallback();
                }
            );

            this._dependentInputs.push(currentDependentInput);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-dropdown-input">
                {this._principalInput.render()}
                {this._dependentInputs.map(
                    (x, index): JSX.Element => (
                        <React.Fragment key={index}>{x.render()}</React.Fragment>
                    )
                )}
                <PrimaryButton
                    text="Submit"
                    disabled={!this._principalInput.isValid || this._dependentInputs.some((x): boolean => !x?.isValid)}
                    onClick={this.printValues}
                />
            </div>
        );
    }

    private updateForm: UpdateCallback = (): void => {
        this.forceUpdate();
    };

    private printValues = (): void => {
        console.log('Principal value: ' + this._principalInput.value);
        console.log('Dependent value: ' + this._dependentInputs.map((x): string => x.value));
    };

    private mapToDropdownOptions(values: Array<string>): Array<IDropdownInputOption> {
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
