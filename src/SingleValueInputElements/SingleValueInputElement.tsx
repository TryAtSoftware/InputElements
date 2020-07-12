import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import InputElement from '../InputElement';
import ISingleValueInputElement from './ISingleValueInputElement';
import ISingleValueInputElementConfiguration from './ISingleInputElementConfiguration';
import ISingleValueInputElementProps from './ISingleValueInputElementProps';
import { ValidationRule } from '../IInputElement';

export default class SingleValueInputElement<TValue, TComponentProps> extends InputElement
    implements ISingleValueInputElement<TValue, TComponentProps> {
    private initialValue: TValue;

    private valueIsSet = false;

    private _isInitiallyValid = true;

    public constructor(
        config: ISingleValueInputElementConfiguration,
        component: React.ComponentType<ISingleValueInputElementProps<TValue> & TComponentProps>,
        props: TComponentProps,
        update: (isInitial?: boolean) => void,
        ...validationRules: ValidationRule<TValue>[]
    ) {
        super(update);

        this.configuration = config;
        this.componentToRender = component;
        this._isInitiallyValid = !this.configuration?.isRequired;
        this.componentProps = props;

        this.validationRules = [];
        validationRules.forEach((rule): void => {
            this.validationRules.push(rule);
        });
    }

    /** @inheritdoc */
    public configuration: ISingleValueInputElementConfiguration;

    /** @inheritdoc */
    public get hasChanges(): boolean {
        return this.value !== this.initialValue;
    }

    /** @inheritdoc */
    public value: TValue;

    /** @inheritdoc */
    public errorMessage: string;

    /** @inheritdoc */
    public validationRules: ValidationRule<TValue>[];

    /** @inheritdoc */
    public get isValid(): boolean {
        return this.valueIsSet ? !this.errorMessage : this._isInitiallyValid;
    }

    /**
     * @inheritdoc
     */

    public componentToRender: React.ComponentType<ISingleValueInputElementProps<TValue> & TComponentProps>;

    /**
     * @inheritdoc
     */
    public componentProps: TComponentProps;

    /**
     * @inheritdoc
     */
    public render(): JSX.Element {
        return (
            <div className={[this.configuration?.className, 'tas-input-element'].filter((x): boolean => !!x).join(' ')}>
                <div className="tas-input-element-content">
                    {this.isLoading ? (
                        <Spinner size={SpinnerSize.medium} />
                    ) : (
                        <this.componentToRender
                            {...this.componentProps}
                            label={this.configuration?.label}
                            value={this.value}
                            isRequired={this.configuration?.renderRequiredIndicator && this.configuration?.isRequired}
                            errorMessage={this.configuration?.renderErrors && this.errorMessage}
                            onChange={(newValue: TValue): void => {
                                this.setInternalValue(newValue);
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }

    /** @inheritdoc */
    public setInitialValue(value: TValue): void {
        if (this.valueIsSet) return;

        this.initialValue = value;

        this.setInternalValue(value, true);
    }

    /** @inheritdoc */
    public setValue(value: TValue): void {
        this.setInternalValue(value, false);
    }

    /** @inheritdoc */
    public validate(): void {
        let errorMessage = '';

        if (this.configuration?.isRequired && !this.value) {
            // If a value is required but the input field is empty.
            errorMessage = this.configuration?.requiredValidationMessage || `The field is required`;
        } else if (this.configuration?.isRequired || this.value || this.configuration?.executeAllValidations) {
            // If a value is provided.
            this.validationRules.forEach((rule): void => {
                if (!errorMessage) errorMessage = rule(this.value);
            });
        } else {
            // If the input field is not required and no value is provided.
            errorMessage = this.validateNonRequiredValue();
        }

        this.errorMessage = errorMessage;
    }

    /**
     * A value indicating whether a spinner should be rendered or the input element itself.
     */
    protected isLoading = false;

    /**
     * A method used to set new value, validate it and update the form.
     *
     * @param value             The new value of the input element.
     *
     * @param isInitial         A value indicating if the initial value is being set.
     */
    protected setInternalValue(value: TValue, isInitial = false): void {
        this.valueIsSet = !isInitial;
        this.value = value;
        this.validate();

        this.update(isInitial);
    }

    protected validateNonRequiredValue(): string {
        return null;
    }
}
