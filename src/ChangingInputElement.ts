import { IChangingInputElement } from './IChangingInputElement';
import { UpdateCallback } from './IInputElement';
import { InputElement } from './InputElement';
import { ValidationRule } from './IValueInputElement';
import { InvalidValueChangeSubscription, ValueChangeSubscription } from './Subscriptions';

export abstract class ChangingInputElement<TValue> extends InputElement implements IChangingInputElement<TValue> {
    protected readonly _valueChangeSubscriptions: ValueChangeSubscription<TValue>[] = [];
    protected readonly _initialValueChangeSubscriptions: ValueChangeSubscription<TValue>[] = [];
    protected readonly _invalidValueChangeSubscriptions: InvalidValueChangeSubscription[] = [];

    protected initialValue: TValue;
    protected _valueIsSet = false;
    protected _initialValueIsSet = false;

    /** @inheritDoc */
    public validationRules: ValidationRule<TValue>[] = [];

    /** @inheritDoc */
    public value: TValue;

    protected constructor(update: UpdateCallback, ...validationRules: ValidationRule<TValue>[]) {
        super(update);

        validationRules.forEach((rule): void => {
            if (!rule) return;
            this.validationRules.push(rule);
        });
    }

    /** @inheritdoc */
    public setInitialValue(value: TValue): void {
        if (this._valueIsSet || this._initialValueIsSet) return;

        this._initialValueIsSet = true;
        this.initialValue = value;
        this.value = value;

        this.setInternalValue(value, true);
        this.validate();
        this.updateInternally();
        this.triggerValueChangeSubscriptions(this._initialValueChangeSubscriptions);
    }

    /** @inheritdoc */
    public setValue(value: TValue): void {
        this._valueIsSet = true;
        this.value = value;

        this.setInternalValue(value, false);
        this.validate();
        this.updateInternally();
        this.triggerValueChangeSubscriptions(this._valueChangeSubscriptions);
    }

    /** @inheritdoc */
    public resetValue(): void {
        if (!this._valueIsSet && !this._initialValueIsSet) return;

        this.setInternalValue(undefined, false);
        this.validate();
        this.updateInternally();
        this.triggerValueChangeSubscriptions(this._valueChangeSubscriptions);
    }

    /** @inheritdoc */
    public subscribeToValueChange(subscription: ValueChangeSubscription<TValue>): void {
        if (!subscription) return;

        this._valueChangeSubscriptions.push(subscription);
    }

    /** @inheritdoc */
    public subscribeToInitialValueChange(subscription: ValueChangeSubscription<TValue>): void {
        if (!subscription) return;

        this._initialValueChangeSubscriptions.push(subscription);
    }

    /** @inheritdoc */
    public subscribeToInvalidValueChange(subscription: InvalidValueChangeSubscription): void {
        if (!subscription) return;

        this._invalidValueChangeSubscriptions.push(subscription);
    }

    /** @inheritdoc */
    public abstract validate(): void;

    protected abstract setInternalValue(value: TValue, isInitial: boolean): void;

    private triggerValueChangeSubscriptions(subscriptions: ValueChangeSubscription<TValue>[]): void {
        if (this.isValid) subscriptions.forEach((subscription): void => subscription(this.value));
        else this._invalidValueChangeSubscriptions.forEach((subscription): void => subscription());
    }
}
