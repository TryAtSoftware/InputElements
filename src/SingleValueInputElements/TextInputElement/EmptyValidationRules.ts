import { FormText } from '../../Components';
import { ValidationRule } from '../../IValueInputElement';

export function restrictEmptyText(errorMessage?: FormText): ValidationRule<string> {
    return (newValue: string): FormText => {
        let error: FormText = '';

        // If the new value contains only whitespace characters or is empty.
        if (!newValue || newValue.length <= 0 || !/\S/.test(newValue)) error = errorMessage || 'The input should not be empty!';

        return error;
    };
}
