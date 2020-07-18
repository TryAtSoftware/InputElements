import { IInputElement, UpdateCallback } from './IInputElement';
import UpdateType from './UpdateType';

export default abstract class InputElement implements IInputElement {
    private _isRendered = false;

    protected constructor(update: UpdateCallback) {
        this.update = update;
    }

    /**
     * @inheritdoc
     */
    public abstract isValid: boolean;

    /**
     * @inheritdoc
     */
    public abstract hasChanges: boolean;

    /**
     * @inheritdoc
     */
    public render(): JSX.Element {
        this._isRendered = true;

        return this.renderComponent();
    }

    protected abstract renderComponent(): JSX.Element;

    /**
     * @inheritdoc
     */
    public update: UpdateCallback = (_updateType: UpdateType): void => {
        // This function should never ever be called in such a manner.
        // Instead a custom function should be passed to the constructor and immediately after that - assigned to this property.
        throw new Error('This function should never be called!');
    };

    protected updateInternally(updateType: UpdateType): void {
        if (!this._isRendered) return;

        this.update(updateType);
    }
}
