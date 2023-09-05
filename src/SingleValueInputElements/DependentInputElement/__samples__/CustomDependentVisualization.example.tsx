import {
    DropdownHelper,
    DropdownInput,
    getFormState,
    IBaseInputElementProps,
    IDropdownInputProps,
    ISingleValueInputElement,
    SingleValueInputElement,
    UpdateCallback
} from '@try-at-software/input-elements';
import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';

interface ICustomVisualizationSequentialDependenciesSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class CustomVisualizationSequentialDependenciesSample extends React.Component<
    unknown,
    ICustomVisualizationSequentialDependenciesSampleState
> {
    private _allInputs: ISingleValueInputElement<string>[] = [];

    public constructor(props: unknown) {
        super(props);

        const dependentElementsCount = 5;
        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        const principalInput = new SingleValueInputElement<string, IBaseInputElementProps, IDropdownInputProps>(
            {
                isRequired: true,
                renderErrors: true,
                label: 'Principal dropdown with sequential dependencies (required, without error handling)'
            },
            DropdownInput,
            { placeholder: 'When you change the value, the dependent dropdown will appear.' },
            this.updateForm
        );
        principalInput.changeDynamicProps({
            options: DropdownHelper.mapToDropdownOptions(options)
        });

        this._allInputs.push(principalInput);

        let previousElement: ISingleValueInputElement<string> = principalInput;
        for (let i = 0; i < dependentElementsCount; i++) {
            const dependentInput = new SingleValueInputElement<string, IBaseInputElementProps, IDropdownInputProps>(
                { isRequired: true, label: `Dependent dropdown #${i + 1} (required, without error handling)` },
                DropdownInput,
                { placeholder: 'The next sequentially dependent input element will appear after you enter some value here.' },
                this.updateForm
            );

            previousElement.subscribeToValueChange((newPrincipalValue: string): void => {
                const dynamicProps = dependentInput.getDynamicProps();
                if (!!dynamicProps?.isDisabled) dependentInput.changeDynamicProps({ isDisabled: false });

                const dependentOptions: string[] = [];
                for (let i = 0; i < 10; i++) dependentOptions.push(newPrincipalValue + i);

                dependentInput.changeDynamicProps({
                    options: DropdownHelper.mapToDropdownOptions(dependentOptions)
                });

                dependentInput.resetValue();
            });
            previousElement.subscribeToInvalidValueChange((): void => {
                const dynamicProps = dependentInput.getDynamicProps();
                if (!dynamicProps?.isDisabled) dependentInput.changeDynamicProps({ isDisabled: true });
                dependentInput.resetValue();
            });
            dependentInput.changeDynamicProps({
                isDisabled: true
            });

            this._allInputs.push(dependentInput);
            previousElement = dependentInput;
        }

        const initialFormStatus = getFormState(this._allInputs);
        this.state = {
            ...initialFormStatus
        };
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-dropdown-input">
                {this._allInputs.map(
                    (x, index): JSX.Element => (
                        <React.Fragment key={index}>{x.render()}</React.Fragment>
                    )
                )}
                <PrimaryButton text="Submit" disabled={!this.state.isValid || !this.state.hasChanges} onClick={this.printValues} />
            </div>
        );
    }

    private updateForm: UpdateCallback = (): void => {
        const formStatus = getFormState(this._allInputs);
        if (formStatus.isValid === this.state.isValid && formStatus.hasChanges === this.state.hasChanges) return;

        this.setState({
            isValid: formStatus.isValid,
            hasChanges: formStatus.hasChanges
        });
    };

    private printValues = (): void => {
        console.log('All values: ' + this._allInputs.map((x): string => x.value));
    };
}
