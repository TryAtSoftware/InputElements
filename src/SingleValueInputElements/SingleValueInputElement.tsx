import * as React from 'react';
import { ExtendedInputElement } from '../ExtendedInputElement';
import { UpdateCallback } from '../IInputElement';
import { ValidationRule } from '../IValueInputElement';
import { combineClasses } from '../Utilities';
import { SingleValueInputElementWrapper } from './InternalPresentationComponents/SingleValueInputElementWrapper';
import { ISingleValueInputElementConfiguration } from './ISingleInputElementConfiguration';
import { ISingleValueInputElement } from './ISingleValueInputElement';
import { ISingleValueInputElementProps } from './ISingleValueInputElementProps';

type WrapperType<TValue, TComponentProps, TRenderProps> = SingleValueInputElementWrapper<
    TValue,
    ISingleValueInputElementProps<TValue> & TComponentProps & TRenderProps
>;

export class SingleValueInputElement<TValue, TComponentProps, TDynamicProps = unknown>
    extends ExtendedInputElement<TValue, WrapperType<TValue, TComponentProps, TDynamicProps>>
    implements ISingleValueInputElement<TValue, TComponentProps, TDynamicProps>
{
    private readonly _configuration: ISingleValueInputElementConfiguration<TValue>;
    private _dynamicProps: TDynamicProps;
    private _isInvalidated = false;

    public constructor(
        config: ISingleValueInputElementConfiguration<TValue>,
        component: React.ComponentType<ISingleValueInputElementProps<TValue> & TComponentProps & TDynamicProps>,
        props: TComponentProps,
        update: UpdateCallback,
        ...validationRules: ValidationRule<TValue>[]
    ) {
        super(update, ...validationRules);

        this._configuration = config;
        this.componentToRender = component;
        this.componentProps = props;
    }

    /** @inheritdoc */
    protected setInternalValue(value: TValue): void {
        if (this._isInvalidated) this._isInvalidated = false;
        if (this._componentRef?.current) this._componentRef.current.update(value);
    }

    /** @inheritdoc */
    public get hasChanges(): boolean {
        return !!this._configuration?.comparator
            ? !this._configuration.comparator.areEqual(this.value, this.initialValue)
            : this.value !== this.initialValue;
    }

    /** @inheritdoc */
    public get isValid(): boolean {
        if (this._isInvalidated) return false;
        if (this.isLoading || !this.isVisible) return false;
        if (this.errorMessage && this.errorMessage.length > 0) return false;

        return (!!this._configuration && !this._configuration.isRequired) || this._valueIsSet || this._initialValueIsSet;
    }

    /** @inheritdoc */
    public readonly componentToRender: React.ComponentType<ISingleValueInputElementProps<TValue> & TComponentProps & TDynamicProps>;

    /** @inheritdoc */
    public componentProps: TComponentProps;

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
                        renderLoadingIndicator={this._configuration?.renderLoadingComponent}
                        componentProps={{
                            ...this.componentProps,
                            label: this._configuration?.label,
                            value: this.value,
                            renderRequiredIndicator: this._configuration?.renderRequiredIndicator && this._configuration?.isRequired,
                            errorMessage: this.errorMessage,
                            onChange: (newValue: TValue): void => this.setValue(newValue),
                            invalidateInput: this.invalidateInput
                        }}
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

        let errorMessage: string = null;

        if (this._configuration?.isRequired && !this.valueIsValid()) {
            // If a value is required but the input field is empty.
            errorMessage = this._configuration?.requiredValidationMessage || `The field is required`;
        } else if (this._configuration?.isRequired || this.value || this._configuration?.executeAllValidations) {
            // If a value is provided.
            this.validationRules.forEach((rule): void => {
                if (!errorMessage) errorMessage = rule(this.value);
            });
        }

        this.errorMessage = errorMessage;
        if (this._componentRef.current) this._componentRef.current.setError(errorMessage);
    }

    private valueIsValid = (): boolean => {
        if (!!this._configuration?.comparator) return this._configuration.comparator.isValid(this.value);

        return !!this.value;
    };

    private invalidateInput = (): void => {
        this._isInvalidated = true;
        this.updateInternally();
        this._invalidValueChangeSubscriptions.forEach((x): void => x?.());
    };
}
