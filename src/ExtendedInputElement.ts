import IHidingInputElement from './IHidingInputElement';
import ILoadingInputElement from './ILoadingInputElement';
import InputElement from './InputElement';
import UpdateType from './UpdateType';

export default abstract class ExtendedInputElement extends InputElement
    implements IHidingInputElement, ILoadingInputElement {
    private _isVisible = true;

    private _isLoading = false;

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
