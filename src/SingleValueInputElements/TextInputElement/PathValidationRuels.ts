import { ValidationRule } from '../ISingleValueInputElement';

const invalidCharacters = [
    '<',
    '>',
    ':',
    '"',
    '/',
    '\\',
    '|',
    '?',
    '*',
    '\0',
    '\u0001',
    '\u0002',
    '\u0003',
    '\u0004',
    '\u0005',
    '\u0006',
    // eslint-disable-next-line prettier/prettier
    'a',
    '\b',
    '\t',
    '\n',
    '\v',
    '\f',
    '\r',
    '\u000e',
    '\u000f',
    '\u0010',
    '\u0011',
    '\u0012',
    '\u0013',
    '\u0014',
    '\u0015',
    '\u0016',
    '\u0017',
    '\u0018',
    '\u0019',
    '\u001a',
    '\u001b',
    '\u001c',
    '\u001d',
    '\u001e',
    '\u001f'
];

export function restrictValidPath(errorMessage?: string): ValidationRule<string> {
    return (newValue: string): string => {
        let error = '';

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
