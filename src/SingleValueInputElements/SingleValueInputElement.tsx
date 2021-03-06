import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { combineClasses } from '../Utilities/StylingHelper';
import { ExtendedConfigurableInputElement } from '../ExtendedConfigurableInputElement';
import { ISingleValueInputElement } from './ISingleValueInputElement';
import { ISingleValueInputElementConfiguration } from './ISingleInputElementConfiguration';
import { ISingleValueInputElementProps } from './ISingleValueInputElementProps';
import { UpdateCallback } from '../IInputElement';
import { ValidationRule } from '../IValueInputElement';

export class SingleValueInputElement<TValue, TComponentProps>
    extends ExtendedConfigurableInputElement<ISingleValueInputElementConfiguration<TValue>, TValue>
    implements ISingleValueInputElement<TValue, TComponentProps> {
    public constructor(
        config: ISingleValueInputElementConfiguration<TValue>,
        component: React.ComponentType<ISingleValueInputElementProps<TValue> & TComponentProps>,
        props: TComponentProps,
        update: UpdateCallback,
        ...validationRules: ValidationRule<TValue>[]
    ) {
        super(config, update);

        this.componentToRender = component;
        this.componentProps = props;

        this.validationRules = [];
        validationRules.forEach((rule): void => {
            this.validationRules.push(rule);
        });
    }

    /** @inheritdoc */
    protected setInternalValue(value: TValue): void {
        this.value = value;
        this.validate();
    }

    /** @inheritdoc */
    public get hasChanges(): boolean {
        return !!this.configuration?.comparator
            ? !this.configuration.comparator.areEqual(this.value, this.initialValue)
            : this.value !== this.initialValue;
    }

    /** @inheritdoc */
    public value: TValue;

    /** @inheritdoc */
    public validationRules: ValidationRule<TValue>[];

    /** @inheritdoc */
    public get isValid(): boolean {
        return (
            ((!!this.configuration && !this.configuration.isRequired) || this._valueIsSet || this._initialValueIsSet) && !this.errorMessage
        );
    }

    /** @inheritdoc */
    public componentToRender: React.ComponentType<ISingleValueInputElementProps<TValue> & TComponentProps>;

    /** @inheritdoc */
    public componentProps: TComponentProps;

    /** @inheritdoc */
    protected renderComponent(): JSX.Element {
        return (
            <div className={combineClasses('tas-input-element', this.configuration?.className)}>
                <div className="tas-input-element-content">
                    {this.isLoading ? (
                        this.renderLoadingIndicator()
                    ) : (
                        <this.componentToRender
                            {...this.componentProps}
                            label={this.configuration?.label}
                            value={this.value}
                            isRequired={this.configuration?.renderRequiredIndicator && this.configuration?.isRequired}
                            errorMessage={this.configuration?.renderErrors && this.errorMessage}
                            onChange={(newValue: TValue): void => {
                                this.setValue(newValue);
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }

    /** @inheritdoc */
    public validate(): void {
        if (!!this.configuration?.shouldExecuteValidation && this.configuration.shouldExecuteValidation() === false) return;

        let errorMessage = '';

        if (this.configuration?.isRequired && !!this.value === false) {
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

    protected validateNonRequiredValue(): string {
        return null;
    }

    private renderLoadingIndicator(): JSX.Element {
        if (!!this.configuration?.renderLoadingComponent) return this.configuration.renderLoadingComponent();

        return <Spinner size={SpinnerSize.medium} />;
    }
}
