import { IInputElement } from './IInputElement';

export type ResetValueOptions = {
    avoidFallbackToInitialValue?: boolean;
};

export interface IChangingInputElement<TValue> extends IInputElement {
    /**
     * A method used to set new value, validate it and update the form.
     *
     * @param value             The new value of the input element.
     */
    setValue(value: TValue): void;

    /**
     * Use this method to set an initial value to the input element.
     * This should be useful for update operations.
     */
    setInitialValue(value: TValue): void;

    /**
     * This method will reset the current value of the input element.
     *
     * @param options           Additional options that can be used to refine the reset process.
     */
    resetValue(options?: ResetValueOptions): void;
}
