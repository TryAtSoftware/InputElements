import { IInputElement } from './IInputElement';

export interface IHidingInputElement<TRenderData = never> extends IInputElement<TRenderData> {
    /**
     * A value indicating whether the input element iss visible. It should not be changed from the outside.
     * To modify this value, use the @see hide and @see show methods.
     */
    isVisible: boolean;

    /**
     * Use this function to hide the input element.
     * If it is already hidden, nothing should happen.
     */
    hide(): void;

    /**
     * Use this function to show the input element if it was hidden before.
     * If it is already visible, nothing should happen.
     */
    show(): void;
}
