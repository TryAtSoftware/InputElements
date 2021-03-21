import { IInputElement } from './IInputElement';

export interface ILoadingInputElement<TRenderData = never> extends IInputElement<TRenderData> {
    /**
     * A value indicating whether the input element is currently loading. It should not be changed from the outside.
     * To modify this value, use the @see load method.
     */
    isLoading: boolean;

    /**
     * A function that will execute the passed @param action while rendering a loading indicator.
     * It should handle errors internally.
     */
    load(action: (doneCallback: () => void) => void): void;
}
