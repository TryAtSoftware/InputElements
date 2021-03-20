import { IChangingInputElement } from './IChangingInputElement';
import { IConfigurableInputElement } from './IConfigurableInputElement';
import { IHidingInputElement } from './IHidingInputElement';
import { IInputElementConfiguration } from './IInputElementConfiguration';
import { ILoadingInputElement } from './ILoadingInputElement';
import { ILoadingInputElementConfiguration } from './ILoadingInputElementConfiguration';
import { InputElement } from './InputElement';
import { UpdateCallback } from './IInputElement';

export abstract class ExtendedInputElement<TValue, TConfiguration extends IInputElementConfiguration & ILoadingInputElementConfiguration>
    extends InputElement
    implements IHidingInputElement, ILoadingInputElement, IChangingInputElement<TValue>, IConfigurableInputElement<TConfiguration> {
    protected initialValue: TValue;
    protected _valueIsSet = false;
    protected _initialValueIsSet = false;

    private _isVisible = true;
    private _isLoading = false;

    protected constructor(configuration: TConfiguration, update: UpdateCallback) {
        super(update);

        this.configuration = configuration;
    }

    /** @inheritdoc */
    public configuration: TConfiguration;

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
    public resetValue(): void {
        if (!this._valueIsSet) return;

        this.setInternalValue(undefined, false);
        this.updateInternally();
    }

    protected abstract setInternalValue(value: TValue, isInitial: boolean): void;

    /** @inheritdoc */
    public get isVisible(): boolean {
        return this._isVisible;
    }

    /** @inheritdoc */
    public hide(): void {
        this._isVisible = false;
        this.updateInternally();
    }

    /** @inheritdoc */
    public show(): void {
        this._isVisible = true;
        this.updateInternally();
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
            this.updateInternally();
        };

        try {
            // If a new value is provided, we should execute asynchronously the `onDependentValueChanged` callback to retrieve the requested selectable models.
            this._isLoading = true;
            this.updateInternally();

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
