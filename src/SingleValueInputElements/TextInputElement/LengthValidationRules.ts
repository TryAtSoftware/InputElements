import { FormText } from '../../Components';
import { ValidationRule } from '../../IValueInputElement';

export function restrictMinimumLength(minLength: number, errorMessage?: FormText): ValidationRule<string> {
    return (newValue: string): FormText => {
        let error: FormText = '';

        // If the new value is shorter than expected, return an error message.
        if (newValue.length < minLength) error = errorMessage || `The value should be longer than ${minLength} characters!`;

        return error;
    };
}

export function restrictMaximumLength(maxLength: number, errorMessage?: FormText): ValidationRule<string> {
    return (newValue: string): FormText => {
        let error: FormText = '';

        // If the new value is longer than expected, return an error message.
        if (newValue.length > maxLength) error = errorMessage || `The value should be shorter than ${maxLength} characters!`;

        return error;
    };
}
