import {
    DropdownInput,
    DropdownInputElement,
    DropdownHelper,
    IBaseInputElementProps,
    IDropdownInputProps,
    IInputElement,
    ISingleValueInputElement,
    UpdateCallback,
    getFormState
} from '@try-at-software/input-elements';
import { Checkbox, PrimaryButton } from '@fluentui/react';
import * as React from 'react';

interface IDependentInputSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class DependentInputSample extends React.Component<unknown, IDependentInputSampleState> {
    private readonly _principalInput: ISingleValueInputElement<string>;
    private readonly _dependentInput: ISingleValueInputElement<string>;
    private readonly _allInputs: IInputElement[];

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._principalInput = new DropdownInputElement<IBaseInputElementProps, IDropdownInputProps>(
            { isRequired: true, label: 'Principal dropdown (required, without error handling)' },
            DropdownInput,
            { placeholder: 'When you change the value, the dependent dropdown will appear.' },
            this.updateForm
        );
        this._principalInput.changeDynamicProps({
            options: DropdownHelper.mapToDropdownOptions(options)
        });

        this._dependentInput = new DropdownInputElement<IBaseInputElementProps, IDropdownInputProps>(
            { isRequired: true, label: 'Dependent dropdown (required, without error handling)' },
            DropdownInput,
            { placeholder: 'When you change the value, the button will become enabled and this message will disappear.' },
            this.updateForm
        );

        this._allInputs = [this._principalInput, this._dependentInput];

        this._principalInput.subscribeToValueChange((newPrincipalValue: string): void => {
            if (!this._dependentInput.isVisible) this._dependentInput.show();

            const dependentOptions: string[] = [];
            for (let i = 0; i < 10; i++) dependentOptions.push(newPrincipalValue + i);

            this._dependentInput.changeDynamicProps({
                options: DropdownHelper.mapToDropdownOptions(dependentOptions)
            });

            // Here you have several options - reset the dependent value or revalidate it.
            this._dependentInput.resetValue();
        });
        this._principalInput.subscribeToInvalidValueChange((): void => {
            if (this._dependentInput.isVisible) this._dependentInput.hide();
        });
        this._dependentInput.hide();

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
}
