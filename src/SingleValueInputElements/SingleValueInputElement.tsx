import * as React from 'react';
import { FormText } from '../Components';
import { ExtendedInputElement } from '../ExtendedInputElement';
import { UpdateCallback } from '../IInputElement';
import { ValidationRule } from '../IValueInputElement';
import { InvalidValueChangeSubscription, ValueChangeSubscription } from '../Subscriptions';
import { combineClasses } from '../Utilities';
import { IDynamicProps } from './IDynamicProps';
import { SingleValueInputElementWrapper } from './InternalPresentationComponents/SingleValueInputElementWrapper';
import { IOperativeProps } from './IOperativeProps';
import { ISingleValueInputElementConfiguration } from './ISingleInputElementConfiguration';
import { ISingleValueInputElement } from './ISingleValueInputElement';
import { IInvalidationOptions, ISingleValueInputElementProps } from './ISingleValueInputElementProps';

export class SingleValueInputElement<TValue, TOperativeProps, TDynamicProps = unknown>
    extends ExtendedInputElement<TValue, SingleValueInputElementWrapper<TValue, TOperativeProps, TDynamicProps>>
    implements ISingleValueInputElement<TValue, TOperativeProps, TDynamicProps>
{
    private readonly _configuration: ISingleValueInputElementConfiguration<TValue>;
    private readonly valueChangeSubscriptions: ValueChangeSubscription<TValue>[] = [];
    private readonly initialValueChangeSubscriptions: ValueChangeSubscription<TValue>[] = [];
    private readonly invalidValueChangeSubscriptions: InvalidValueChangeSubscription[] = [];
    private _dynamicProps: TDynamicProps;
    private _isInvalidated = false;

    public constructor(
        config: ISingleValueInputElementConfiguration<TValue>,
        component: React.ComponentType<
            ISingleValueInputElementProps<TValue> & IOperativeProps<TOperativeProps> & IDynamicProps<TDynamicProps>
        >,
        props: TOperativeProps,
        update: UpdateCallback,
        ...validationRules: ValidationRule<TValue>[]
    ) {
        super(update);

        this._configuration = config;
        this.componentToRender = component;
        this.componentProps = props;

        this.validationRules = [];
        validationRules.forEach((rule): void => {
            if (!rule) return;
            this.validationRules.push(rule);
        });
    }

    /** @inheritdoc */
    public subscribeToValueChange(subscription: ValueChangeSubscription<TValue>): void {
        if (!subscription) return;

        this.valueChangeSubscriptions.push(subscription);
    }

    /** @inheritdoc */
    public subscribeToInitialValueChange(subscription: ValueChangeSubscription<TValue>): void {
        if (!subscription) return;

        this.initialValueChangeSubscriptions.push(subscription);
    }

    /** @inheritdoc */
    public subscribeToInvalidValueChange(subscription: InvalidValueChangeSubscription): void {
        if (!subscription) return;

        this.invalidValueChangeSubscriptions.push(subscription);
    }

    /** @inheritdoc */
    protected setInternalValue(value: TValue, isInitial: boolean): void {
        if (this._isInvalidated) this._isInvalidated = false;

        const previousValue = this.value;
        this.value = value;

        if (this._componentRef?.current) this._componentRef.current.update(value);
        this.validate();

        if (this.isValid) {
            if (isInitial) this.initialValueChangeSubscriptions.forEach((x): void => x?.(this.value, previousValue));
            else this.valueChangeSubscriptions.forEach((x): void => x?.(this.value, previousValue));
        } else this.invalidValueChangeSubscriptions.forEach((x): void => x?.());
    }

    /** @inheritdoc */
    public get hasChanges(): boolean {
        return !!this._configuration?.comparator
            ? !this._configuration.comparator.areEqual(this.value, this.initialValue)
            : this.value !== this.initialValue;
    }

    /** @inheritdoc */
    public value: TValue;

    /** @inheritdoc */
    public validationRules: ValidationRule<TValue>[];

    /** @inheritdoc */
    public get isValid(): boolean {
        if (this._isInvalidated || this.isLoading || this.errorMessage) return false;
        return (!!this._configuration && !this._configuration.isRequired) || this._valueIsSet || this._initialValueIsSet;
    }

    /** @inheritdoc */
    public readonly componentToRender: React.ComponentType<
        ISingleValueInputElementProps<TValue> & IOperativeProps<TOperativeProps> & IDynamicProps<TDynamicProps>
    >;

    /** @inheritdoc */
    public componentProps: TOperativeProps;

    /** @inheritdoc */
    public getDynamicProps(): TDynamicProps {
        return this._dynamicProps;
    }

    /** @inheritdoc */
    protected renderComponent(): JSX.Element {
        return (
            <div className={combineClasses('tas-input-element', this._configuration?.className)}>
                <div className="tas-input-element-content">
                    <SingleValueInputElementWrapper
                        internalComponent={this.componentToRender}
                        renderErrors={this._configuration?.renderErrors}
                        loadingIndicator={this._configuration?.loadingComponent}
                        inputProps={{
                            label: this._configuration?.label,
                            value: this.value,
                            renderRequiredIndicator: this._configuration?.renderRequiredIndicator && this._configuration?.isRequired,
                            errorMessage: this.errorMessage,
                            onChange: (newValue: TValue): void => this.setValue(newValue),
                            invalidateInput: this.invalidateInput
                        }}
                        operativeProps={this.componentProps}
                        initialDynamicProps={this._dynamicProps}
                        isInitiallyLoading={this.isLoading}
                        isInitiallyVisible={this.isVisible}
                        ref={this._componentRef}
                    />
                </div>
            </div>
        );
    }

    /** @inheritdoc */
    public changeDynamicProps<K extends keyof TDynamicProps>(dynamicProps: Pick<TDynamicProps, K>): void {
        if (!dynamicProps) return;
        this._dynamicProps = {
            ...this._dynamicProps,
            ...dynamicProps
        };

        if (!this._componentRef?.current) return;
        this._componentRef.current.changeDynamicProps(this._dynamicProps);
    }

    /** @inheritdoc */
    public validate(): void {
        if (!!this._configuration?.shouldExecuteValidation && this._configuration.shouldExecuteValidation() === false) return;

        let errorMessage: FormText = undefined;

        if (this._configuration?.isRequired && !this.valueIsValid()) {
            // If a value is required but the input field is empty.
            errorMessage = this._configuration?.requiredValidationMessage || `The field is required`;
        } else if (this._configuration?.isRequired || this.value || this._configuration?.executeAllValidations) {
            // If a value is provided.
            for (const validationRule of this.validationRules) {
                const currentError = validationRule(this.value);
                if (currentError) {
                    errorMessage = currentError;
                    break;
                }
            }
        }

        this.setError(errorMessage);
    }

    private setError = (errorMessage: FormText): void => {
        this.errorMessage = errorMessage;
        if (this._componentRef.current) this._componentRef.current.setError(errorMessage);
    };

    private valueIsValid = (): boolean => {
        if (!!this._configuration?.comparator) return this._configuration.comparator.isValid(this.value);

        return !!this.value;
    };

    private invalidateInput = (options?: IInvalidationOptions): void => {
        this._isInvalidated = true;
        if (options?.errorMessage) this.setError(options.errorMessage);

        this.updateInternally();
        this.invalidValueChangeSubscriptions.forEach((x): void => x?.());
    };
}
