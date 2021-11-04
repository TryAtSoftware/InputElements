import {
    DropdownHelper,
    DropdownInput,
    DropdownInputElement,
    getFormState,
    IInputElement,
    IBaseInputElementProps,
    IDropdownInputProps,
    ISingleValueInputElement,
    UpdateCallback
} from '@try-at-software/input-elements';
import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';

interface IMultipleDependenciesSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class MultipleDependenciesSample extends React.Component<unknown, IMultipleDependenciesSampleState> {
    private readonly _principalInput: ISingleValueInputElement<string>;
    private readonly _dependentInputs: ISingleValueInputElement<string>[] = [];
    private readonly _allInputs: IInputElement[] = [];

    public constructor(props: unknown) {
        super(props);

        const dependentElementsCount = 5;
        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._principalInput = new DropdownInputElement<IBaseInputElementProps, IDropdownInputProps>(
            { isRequired: true, label: 'Principal dropdown with multiple dependencies (required, without error handling)' },
            DropdownInput,
            { placeholder: 'When you change the value, the dependent dropdown will appear.' },
            this.updateForm
        );
        this._principalInput.changeDynamicProps({
            options: DropdownHelper.mapToDropdownOptions(options)
        });

        for (let i = 0; i < dependentElementsCount; i++) {
            const dependentInput = new DropdownInputElement<IBaseInputElementProps, IDropdownInputProps>(
                { isRequired: false, label: `Dependent dropdown #${i + 1} (not required, without error handling)` },
                DropdownInput,
                { placeholder: 'None of all dependent input elements is required, so the button is already enabled.' },
                this.updateForm
            );

            this._principalInput.subscribeToValueChange((newPrincipalValue: string): void => {
                if (!dependentInput.isVisible) dependentInput.show();

                const dependentOptions: string[] = [];
                for (let i = 0; i < 10; i++) dependentOptions.push(newPrincipalValue + i);

                dependentInput.changeDynamicProps({
                    options: DropdownHelper.mapToDropdownOptions(dependentOptions)
                });

                dependentInput.resetValue();
            });
            this._principalInput.subscribeToInvalidValueChange((): void => {
                if (dependentInput.isVisible) dependentInput.hide();
            });
            dependentInput.hide();

            this._dependentInputs.push(dependentInput);
        }

        this._allInputs = [this._principalInput, ...this._dependentInputs];

        const initialFormStatus = getFormState(this._allInputs);
        this.state = {
            ...initialFormStatus
        };
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
        console.log('Principal value: ' + this._principalInput.value);
        console.log('Dependent value: ' + this._dependentInputs.map((x): string => x.value));
    };
}
