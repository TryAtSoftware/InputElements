import * as React from 'react';
import {
    DropdownInputElement,
    DropdownHelper,
    ISingleValueInputElement,
    UpdateCallback,
    getFormState
} from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';

interface ISequentialDependenciesSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class SequentialDependenciesSample extends React.Component<unknown, ISequentialDependenciesSampleState> {
    private _allInputs: ISingleValueInputElement<string>[] = [];

    public constructor(props: unknown) {
        super(props);

        const dependentElementsCount = 5;
        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        const principalInput = new DropdownInputElement(
            { isRequired: true, label: 'Principal dropdown with sequential dependencies (required, without error handling)' },
            { placeholder: 'When you change the value, the dependent dropdown will appear.' },
            this.updateForm
        );
        principalInput.changeDynamicProps({
            options: DropdownHelper.mapToDropdownOptions(options)
        });

        this._allInputs.push(principalInput);

        let previousElement: ISingleValueInputElement<string> = principalInput;
        for (let i = 0; i < dependentElementsCount; i++) {
            const dependentInput = new DropdownInputElement(
                { isRequired: true, label: `Dependent dropdown #${i + 1} (required, without error handling)` },
                { placeholder: 'The next sequentially dependent input element will appear after you enter some value here.' },
                this.updateForm
            );

            previousElement.subscribeToValueChange((newPrincipalValue: string): void => {
                if (!dependentInput.isVisible) dependentInput.show();

                const dependentOptions: string[] = [];
                for (let i = 0; i < 10; i++) dependentOptions.push(newPrincipalValue + i);

                dependentInput.changeDynamicProps({
                    options: DropdownHelper.mapToDropdownOptions(dependentOptions)
                });

                dependentInput.resetValue();
            });
            previousElement.subscribeToInvalidValueChange((): void => {
                if (dependentInput.isVisible) dependentInput.hide();
                dependentInput.resetValue();
            });
            dependentInput.hide();

            this._allInputs.push(dependentInput);
            previousElement = dependentInput;
        }

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
                {this._allInputs.map(
                    (x, index): JSX.Element => (
                        <React.Fragment key={index}>{x.render()}</React.Fragment>
                    )
                )}
                <PrimaryButton text="Submit" disabled={this._allInputs.some((x): boolean => !x?.isValid)} onClick={this.printValues} />
            </div>
        );
    }

    private printValues = (): void => {
        console.log('All values: ' + this._allInputs.map((x): string => x.value));
    };
}
