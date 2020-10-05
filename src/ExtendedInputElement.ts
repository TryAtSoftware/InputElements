import { IChangingInputElement } from './IChangingInputElement';
import { IHidingInputElement } from './IHidingInputElement';
import { ILoadingInputElement } from './ILoadingInputElement';
import { InputElement } from './InputElement';
import { UpdateCallback } from './IInputElement';
import { UpdateType } from './UpdateType';

export abstract class ExtendedInputElement<TChangeValue> extends InputElement
    implements IHidingInputElement, ILoadingInputElement, IChangingInputElement<TChangeValue> {
    protected initialValue: TChangeValue;

    protected _valueIsSet = false;

    protected _initialValueIsSet = false;

    private _isVisible = true;

    private _isLoading = false;

    protected constructor(update: UpdateCallback) {
        super(update);
    }

    /** @inheritdoc */
    public setInitialValue(value: TChangeValue): void {
        if (this._valueIsSet || this._initialValueIsSet) return;

        this._initialValueIsSet = true;
        this.initialValue = value;

        this.setInternalValue(value, true);
        this.updateInternally(UpdateType.Initial);
    }

    /** @inheritdoc */
    public setValue(value: TChangeValue): void {
        this._valueIsSet = true;

        this.setInternalValue(value, false);
        this.updateInternally(UpdateType.NewValue);
    }

    /** @inheritdoc */
    public resetValue(): void {
        if (!this._valueIsSet) return;

        this.setInternalValue(undefined, false);
        this.updateInternally(UpdateType.NewValue);
    }

    protected abstract setInternalValue(value: TChangeValue, isInitial: boolean): void;

    /** @inheritdoc */
    public get isVisible(): boolean {
        return this._isVisible;
    }

    /** @inheritdoc */
    public hide(): void {
        this._isVisible = false;
        this.updateInternally(UpdateType.System);
    }

    /** @inheritdoc */
    public show(): void {
        this._isVisible = true;
        this.updateInternally(UpdateType.System);
    }

    /** @inheritdoc */
    public render(): JSX.Element {
        if (!this.isVisible) return null;

        return super.render();
    }

    /** @inheritdoc */
    public get isLoading(): boolean {
        return this._isLoading;
    }

    /** @inheritdoc */
    public load(action: (doneCallback: () => void) => void): void {
        if (!action) return;

        const callback = (): void => {
            this._isLoading = false;
            this.updateInternally(UpdateType.System);
        };

        try {
            // If a new value is provided, we should execute asynchronously the `onDependentValueChanged` callback to retrieve the requested selectable models.
            this._isLoading = true;
            this.updateInternally(UpdateType.System);

            action(callback);
        } catch (error) {
            let newErrorMessage: string;

            if (error instanceof Error) newErrorMessage = error.message;
            if (typeof error === 'string') newErrorMessage = error;
            else throw error;

            this.errorMessage = newErrorMessage;
            callback();
        }
    }
}
