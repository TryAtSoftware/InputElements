import { IInputElement } from './IInputElement';
import ILoadingInputElement from './ILoadingInputElement';

export interface IValueInputElement<TValue> extends IInputElement, ILoadingInputElement {
    /**
     * The value entered into the input element.
     */
    value: TValue;

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
}

export type ValidationRule<TValue> = (value: TValue) => string;
