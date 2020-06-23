import {
    invalidCharacters,
    restrictValidPath
} from '../src/SingleValueInputElements/TextInputElement/PathValidationRules';
import each from 'jest-each';
import { getRandomString } from './_testsCommon';

describe('EmptyValidationRules', (): void => {
    const invalidInputs = invalidCharacters;
    const validInputs = [getRandomString()];

    function getTestData(): unknown[][] {
        const table: unknown[][] = [];

        const messages = [getRandomString(), null, '', undefined];

        invalidInputs.forEach((currentInput): void => {
            messages.forEach((message): void => {
                table.push([message, currentInput, false]);
            });
        });

        validInputs.forEach((currentInput): void => {
            messages.forEach((message): void => {
                table.push([message, currentInput, true]);
            });
        });

        return table;
    }

    each(getTestData()).it(
        'Should return an error message for path-unsafe input and nothing for all other cases',
        (message: string, input: string, isValid: boolean): void => {
            const validationRule = restrictValidPath(message);

            // Assert that if an invalid path is passed, an error is returned.
            const result = validationRule(input);

            if (isValid) expect(result).toBeFalsy();
            else {
                expect(result).toBeTruthy();

                if (!!message) expect(result).toEqual(message);
            }
        }
    );

    it('Should not return error message if the input is correct', (): void => {
        validInputs.forEach((ic): void => {
            const currentMessage = getRandomString();

            const validationRule = restrictValidPath(currentMessage);

            // Assert that if a valid path is passed, no error is returned.
            const result = validationRule(ic);

            expect(result).toBeFalsy();
        });
    });
});
