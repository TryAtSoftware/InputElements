import { FormText } from '../../Components';
import { ValidationRule } from '../../IValueInputElement';
import { invalidCharacters } from '../TextInputElement';

export function ensureConsistency(errorMessage?: FormText): ValidationRule<string> {
    return (newValue: string): FormText => {
        let error: FormText = '';

        for (let i = 0; i < invalidCharacters.length; i++) {
            const currentChar = invalidCharacters[i];
            if (newValue.indexOf(currentChar) >= 0) {
                error = errorMessage || 'The input should not contain invalid path characters!';
                break;
            }
        }

        return error;
    };
}
