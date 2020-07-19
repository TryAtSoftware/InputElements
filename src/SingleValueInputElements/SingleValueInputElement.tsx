import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import ExtendedInputElement from '../ExtendedInputElement';
import ISingleValueInputElement from './ISingleValueInputElement';
import ISingleValueInputElementConfiguration from './ISingleInputElementConfiguration';
import ISingleValueInputElementProps from './ISingleValueInputElementProps';
import { UpdateCallback } from '../IInputElement';
import UpdateType from '../UpdateType';
import { ValidationRule } from '../IValueInputElement';

export default class SingleValueInputElement<TValue, TComponentProps> extends ExtendedInputElement
    implements ISingleValueInputElement<TValue, TComponentProps> {
    private initialValue: TValue;

    private _valueIsSet = false;

    private _initialValueIsSet = false;

    public constructor(
        config: ISingleValueInputElementConfiguration,
        component: React.ComponentType<ISingleValueInputElementProps<TValue> & TComponentProps>,
        props: TComponentProps,
        update: UpdateCallback,
        ...validationRules: ValidationRule<TValue>[]
    ) {
        super(update);

        this.configuration = config;
        this.componentToRender = component;
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
    public validationRules: ValidationRule<TValue>[];

    /** @inheritdoc */
    public get isValid(): boolean {
        return (
            ((!!this.configuration && !this.configuration.isRequired) || this._valueIsSet || this._initialValueIsSet) &&
            !this.errorMessage
        );
    }

    /** @inheritdoc */
    public componentToRender: React.ComponentType<ISingleValueInputElementProps<TValue> & TComponentProps>;

    /** @inheritdoc */
    public componentProps: TComponentProps;

    /** @inheritdoc */
    protected renderComponent(): JSX.Element {
        return (
            <div className={[this.configuration?.className, 'tas-input-element'].filter((x): boolean => !!x).join(' ')}>
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
        if (this._valueIsSet || this._initialValueIsSet) return;

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

    /**
     * A method used to set new value, validate it and update the form.
     *
     * @param value             The new value of the input element.
     *
     * @param isInitial         A value indicating if the initial value is being set.
     */
    protected setInternalValue(value: TValue, isInitial = false): void {
        if (isInitial) this._initialValueIsSet = true;
        else this._valueIsSet = true;

        this.value = value;
        this.validate();

        this.updateInternally(isInitial ? UpdateType.Initial : UpdateType.NewValue);
    }

    protected validateNonRequiredValue(): string {
        return null;
    }

    private renderLoadingIndicator(): JSX.Element {
        if (!!this.configuration?.renderLoadingComponent) return this.configuration.renderLoadingComponent();

        return <Spinner size={SpinnerSize.medium} />;
    }
}
