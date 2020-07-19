import IChangingInputElement from './IChangingInputElement';
import IConfigurableInputElement from './IConfigurableInputElement';
import IHidingInputElement from './IHidingInputElement';
import IInputElementConfiguration from './IInputElementConfiguration';
import ILoadingInputElement from './ILoadingInputElement';
import ILoadingInputElementConfiguration from './ILoadingInputElementConfiguration';
import InputElement from './InputElement';
import { UpdateCallback } from './IInputElement';
import UpdateType from './UpdateType';

export default abstract class ExtendedInputElement<
    TConfiguration extends IInputElementConfiguration & ILoadingInputElementConfiguration,
    TChangeValue
> extends InputElement
    implements
        IHidingInputElement,
        ILoadingInputElement,
        IConfigurableInputElement<TConfiguration>,
        IChangingInputElement<TChangeValue> {
    protected initialValue: TChangeValue;

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
    public setInitialValue(value: TChangeValue): void {
        if (this._valueIsSet || this._initialValueIsSet) return;

        this._initialValueIsSet = true;
        this.initialValue = value;

        this.setInternalValue(value, false);
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

        this.setInternalValue(null, false);
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
