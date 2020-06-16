import { IInputElement } from './IInputElement';

export default abstract class InputElement implements IInputElement {
    protected constructor(update: () => void) {
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
    public abstract render(): JSX.Element;

    /**
     * @inheritdoc
     */
    public update = (_isInitial?: boolean): void => {
        // This function should never ever be called in such a manner.
        // Instead a custom function should be passed to the constructor and immediately after that - assigned to this property.
        throw new Error('This function should never be called!');
    };
}
