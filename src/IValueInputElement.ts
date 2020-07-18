import { IInputElement } from './IInputElement';

export interface IValueInputElement<TValue> extends IInputElement {
    /**
     * The value entered into the input element.
     */
    value: TValue;

    /**
     * The message of the first validation error that occurred if any.
     */
    errorMessage: string;

    /**
     * Collection of validation rules that are executed whenever the entered value has changed.
     */
    validationRules: ValidationRule<TValue>[];

    /**
     * This method is called every time after the entered value has changed.
     * Its main purpose is to call every single validation rule and update the error message if some of them has failed.
     */
    validate(): void;

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
     * A value indicating whether the input element is currently loading. It should not be changed from the outside.
     * To modify this value, use the @see load method.
     */
    isLoading: boolean;

    /**
     * A function that will execute the passed @param action while rendering a loading indicator.
     * It should handle errors internally.
     */
    load(action: (doneCallback: () => void) => void): void;

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

export type ValidationRule<TValue> = (value: TValue) => string;
