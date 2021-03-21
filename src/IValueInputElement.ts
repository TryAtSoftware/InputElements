import { IInputElement } from './IInputElement';

export interface IValueInputElement<TValue, TRenderData = never> extends IInputElement<TRenderData> {
    /**
     * The value entered into the input element.
     */
    value: TValue;

    /**
     * Collection of validation rules that are executed whenever the entered value has changed.
     * Some input elements may not use this value, e.g. dynamic list input elements should ignore it as every single underlying input element can have unique rules.
     */
    validationRules: ValidationRule<TValue>[];

    /**
     * This method is called every time after the entered value has changed.
     * Its main purpose is to call every single validation rule and update the error message if some of them has failed.
     * It can be safely called from outside.
     */
    validate(): void;
}

export type ValidationRule<TValue> = (value: TValue) => string;
