import { IInputElement, UpdateCallback } from './IInputElement';
import { UpdateType } from './UpdateType';

export abstract class InputElement implements IInputElement {
    private _isRendered = false;

    protected constructor(update: UpdateCallback) {
        this.update = update;
    }

    /** @inheritdoc */
    public abstract isValid: boolean;

    /** @inheritdoc */
    public errorMessage: string;

    /** @inheritdoc */
    public abstract hasChanges: boolean;

    /** @inheritdoc */
    public render(): JSX.Element {
        this._isRendered = true;

        return this.renderComponent();
    }

    protected abstract renderComponent(): JSX.Element;

    /** @inheritdoc */
    public update: UpdateCallback = (): void => {
        // This function should never ever be called in such a manner.
        // Instead a custom function should be passed to the constructor and immediately after that - assigned to this property.
        throw new Error('This function should never be called!');
    };

    protected updateInternally(updateType: UpdateType): void {
        // System events should not lead to re-render if the input element is never visualized.
        if (!this._isRendered && updateType === UpdateType.System) return;

        this.update(updateType);
    }
}
