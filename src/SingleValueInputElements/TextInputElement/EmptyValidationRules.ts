import { ValidationRule } from '../../IValueInputElement';

export function restrictEmptyText(errorMessage?: string): ValidationRule<string> {
    return (newValue: string): string => {
        let error = '';

        // If the new value contains only whitespace characters or is empty.
        if (!newValue || newValue.length <= 0 || !/\S/.test(newValue)) error = errorMessage || 'The input should not be empty!';

        return error;
    };
}
