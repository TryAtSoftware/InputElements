import { getRandomNumber, getRandomString } from './_testsCommon';
import {
    restrictMaximumLength,
    restrictMinimumLength
} from './../src/SingleValueInputElements/TextInputElement/LengthValidationRules';

describe('LengthValidationRules', (): void => {
    it('Should restrict min length', (): void => {
        // Generate a random length to test the minimum length validation rule.
        const length = getRandomNumber(15, 20);

        // Get the validation rule for the previously generated length.
        const validationRule = restrictMinimumLength(length);

        // Assert that if a shorter value is passed, an error is returned.
        const shorterValueResult = validationRule(getRandomString(length - 1));
        expect(shorterValueResult).toBeTruthy();

        // Assert that if a value with the same length is passed, no error is returned.
        const exactLengthResult = validationRule(getRandomString(length));
        expect(exactLengthResult).toBeFalsy();

        // Assert that if a longer value is passed, no error is returned.
        const longerLengthResult = validationRule(getRandomString(length + 1));
        expect(longerLengthResult).toBeFalsy();
    });

    it('Should restrict max length', (): void => {
        // Generate a random length to test the minimum length validation rule.
        const length = getRandomNumber(15, 20);

        // Get the validation rule for the previously generated length.
        const validationRule = restrictMaximumLength(length);

        // Assert that if a shorter value is passed, no error is returned.
        const shorterValueResult = validationRule(getRandomString(length - 1));
        expect(shorterValueResult).toBeFalsy();

        // Assert that if a value with the same length is passed, no error is returned.
        const exactLengthResult = validationRule(getRandomString(length));
        expect(exactLengthResult).toBeFalsy();

        // Assert that if a longer value is passed, an error is returned.
        const longerLengthResult = validationRule(getRandomString(length + 1));
        expect(longerLengthResult).toBeTruthy();
    });
});
