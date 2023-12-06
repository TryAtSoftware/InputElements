import { IChangingInputElement, ResetValueOptions } from './IChangingInputElement';
import { UpdateCallback } from './IInputElement';
import { InputElement } from './InputElement';

export abstract class ChangingInputElement<TValue> extends InputElement implements IChangingInputElement<TValue> {
    protected initialValue: TValue;
    protected _valueIsSet = false;
    protected _initialValueIsSet = false;

    protected constructor(update: UpdateCallback) {
        super(update);
    }

    /** @inheritdoc */
    public setInitialValue(value: TValue): void {
        if (this._valueIsSet || this._initialValueIsSet) return;

        this._initialValueIsSet = true;
        this.initialValue = value;

        this.setInternalValue(value, true);
        this.updateInternally();
    }

    /** @inheritdoc */
    public setValue(value: TValue): void {
        this._valueIsSet = true;

        this.setInternalValue(value, false);
        this.updateInternally();
    }

    /** @inheritdoc */
    public resetValue(options?: ResetValueOptions): void {
        if (!this._valueIsSet && !this._initialValueIsSet) return;

        this._valueIsSet = false;

        if (!options?.avoidFallbackToInitialValue && this._initialValueIsSet) {
            this._initialValueIsSet = false;
            this.setInitialValue(this.initialValue);
        } else this.resetInternalValue();
    }

    protected abstract setInternalValue(value: TValue, isInitial: boolean): void;
    protected abstract resetInternalValue(): void;
}
