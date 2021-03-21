import { IInputElement, UpdateCallback } from './IInputElement';

export abstract class InputElement<TRenderData = never> implements IInputElement<TRenderData> {
    private _isRendered = false;

    protected constructor(update: UpdateCallback) {
        if (!update) throw new Error('No update callback was provided to the input element.');
        this.update = update;
    }

    /** @inheritdoc */
    public abstract isValid: boolean;

    /** @inheritdoc */
    public errorMessage: string;

    /** @inheritdoc */
    public abstract hasChanges: boolean;

    /** @inheritdoc */
    public render(renderData?: TRenderData): JSX.Element {
        this._isRendered = true;

        return this.renderComponent(renderData);
    }

    protected abstract renderComponent(renderData?: TRenderData): JSX.Element;

    /** @inheritdoc */
    public update: UpdateCallback = (): void => {
        // This function should never ever be called in such a manner.
        // Instead a custom function should be passed to the constructor and immediately after that - assigned to this property.
        throw new Error('This function should never be called!');
    };

    protected updateInternally(): void {
        // System events should not lead to re-render if the input element is never visualized.
        if (!this._isRendered) return;

        this.update();
    }
}
