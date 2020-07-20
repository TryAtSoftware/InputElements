import * as React from 'react';
import DependentInputElementInitializer from '../DependentInputElementInitializer';
import DropdownInput from '../../DropdownInputElement/DropdownInput';
import IDropdownInputOption from '../../DropdownInputElement/IDropdownInputOption';
import IDropdownInputProps from '../../DropdownInputElement/IDropdownInputProps';
import ISingleValueInputElement from '../../ISingleValueInputElement';
import { PrimaryButton } from 'office-ui-fabric-react';
import SingleValueInputElement from '../../SingleValueInputElement';
import { UpdateCallback } from '../../../IInputElement';

export default class CustomVisualizationSequentialDependenciesSample extends React.Component {
    private _allInputs: ISingleValueInputElement<string, IDropdownInputProps>[] = [];

    public constructor(props: unknown) {
        super(props);

        const dependentElementsCount = 5;
        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        const initialInput = new SingleValueInputElement<string, IDropdownInputProps>(
            {
                isRequired: true,
                label: 'Principal dropdown with sequential dependencies (required, without error handling)'
            },
            DropdownInput,
            {
                options: this.mapToDropdownOptions(options),
                placeholder: 'When you change the value, a dependent dropdown will appear.'
            },
            this.updateForm
        );

        this._allInputs.push(initialInput);

        let previousElement = initialInput;

        for (let i = 0; i < dependentElementsCount; i++) {
            const currentDependentInput = new SingleValueInputElement<string, IDropdownInputProps>(
                { isRequired: true, label: `Dependent dropdown #${i + 1} (required, without error handling)` },
                DropdownInput,
                {
                    placeholder: 'None of all dependent input elements is required, so the button is already enabled.'
                },
                this.updateForm
            );

            const disableInput = (): void => {
                currentDependentInput.componentProps.isDisabled = true;
            };

            DependentInputElementInitializer.initializeDependency(
                previousElement,
                currentDependentInput,
                (newPrincipalValue: string, doneCallback: () => void): void => {
                    currentDependentInput.componentProps.isDisabled = false;

                    const dependentOptions: string[] = [];
                    for (let i = 0; i < 10; i++) dependentOptions.push(newPrincipalValue + i);

                    currentDependentInput.componentProps.options = this.mapToDropdownOptions(dependentOptions);

                    doneCallback();
                },
                disableInput,
                disableInput
            );

            this._allInputs.push(currentDependentInput);
            previousElement = currentDependentInput;
        }
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-dropdown-input">
                {this._allInputs.map(
                    (x, index): JSX.Element => (
                        <React.Fragment key={index}>{x.render()}</React.Fragment>
                    )
                )}
                <PrimaryButton
                    text="Submit"
                    disabled={this._allInputs.some((x): boolean => !x?.isValid)}
                    onClick={this.printValues}
                />
            </div>
        );
    }

    private updateForm: UpdateCallback = (): void => {
        this.forceUpdate();
    };

    private printValues = (): void => {
        console.log('All values: ' + this._allInputs.map((x): string => x.value));
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
