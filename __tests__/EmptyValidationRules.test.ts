import { emptyStrings, getRandomString } from './_testsCommon';
import each from 'jest-each';
import { restrictEmptyText } from './../src/SingleValueInputElements/TextInputElement/EmptyValidationRules';

describe('EmptyValidationRules', (): void => {
    const invalidInputs = emptyStrings;
    const validInputs = [getRandomString()];

    function getTestData(): unknown[][] {
        const table: unknown[][] = [];

        const messages = [getRandomString(), null, '', undefined];

        invalidInputs.forEach((currentInput): void => {
            messages.forEach((message): void => {
                table.push([message, currentInput, true]);
            });
        });

        validInputs.forEach((currentInput): void => {
            messages.forEach((message): void => {
                table.push([message, currentInput, false]);
            });
        });

        return table;
    }

    each(getTestData()).it(
        'Should return an error message for empty input',
        (message: string, input: string, isEmpty: boolean): void => {
            // Get the validation rule for the previously generated length.
            const validationRule = restrictEmptyText(message);

            // Assert that if a shorter value is passed, an error is returned.
            const result = validationRule(input);

            if (isEmpty) {
                expect(result).toBeTruthy();

                if (!!message) expect(result).toEqual(message);
            } else expect(result).toBeFalsy();
        }
    );

    it('Should not return error if the input is correct', (): void => {
        validInputs.forEach((ic): void => {
            const currentMessage = getRandomString();

            const validationRule = restrictEmptyText(currentMessage);

            // Assert that if a valid path is passed, no error is returned.
            const result = validationRule(ic);

            expect(result).toBeFalsy();
        });
    });
});
