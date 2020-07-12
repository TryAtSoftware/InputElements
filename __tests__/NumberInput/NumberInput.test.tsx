import * as React from 'react';
import { emptyStrings, getRandomFloat, getRandomNumber, getRandomString } from '../_testsCommon';
import each from 'jest-each';
import EnzymeTestsHelper from '../EnzymeTestsHelper';
import { mount } from 'enzyme';
import NumberInput from '../../src/SingleValueInputElements/NumberInputElement/NumberInput';
import SingleValueInputElementTestHelpers from '../SingleValueInputElementTestHelpers';
import { SpinButton } from 'office-ui-fabric-react';

describe('Number input', () => {
    const spinButtonInputQuerySelector = 'input.ms-spinButton-input';
    const updateFunction = jest.fn<void, [number]>();

    beforeEach((): void => {
        updateFunction.mockReset();
    });

    each([getRandomString(), ...emptyStrings]).it('should render correctly', (placeholderValue: string) => {
        const props = SingleValueInputElementTestHelpers.getRandomProps(getRandomNumber(0, 1000), updateFunction);
        const component = mount(<NumberInput {...props} placeholder={placeholderValue} />);

        EnzymeTestsHelper.expectExists(component);

        const underlyingSpinButton = component.find(SpinButton);
        EnzymeTestsHelper.expectExists(underlyingSpinButton);

        expect(underlyingSpinButton.prop('label')).toBeFalsy();
        expect(underlyingSpinButton.prop('placeholder')).toEqual(placeholderValue);

        expect(updateFunction).toHaveBeenCalledTimes(0);
    });

    interface ITestCase {
        allowDecimals: boolean;
        suffix?: string;
        inputValue: string;
        expectedResult: number;
    }

    function getTestData(): unknown[][] {
        const table: unknown[][] = [];

        const testCases: ITestCase[] = [
            prepareTestCase(true, true),
            prepareTestCase(true, false),
            prepareTestCase(false, true),
            prepareTestCase(false, false)
        ];

        testCases.forEach((tc): void => {
            const appendTestCase = (x: ITestCase): void => {
                expect(x).toBeTruthy();
                table.push([x]);
            };

            randomizeTestCaseInputValue(tc, getRandomString(0, false), appendTestCase);

            const randomSuffix = getRandomString(0, false);
            const suffixedCase: ITestCase = { ...tc, suffix: randomSuffix };
            randomizeTestCaseInputValue(suffixedCase, randomSuffix, appendTestCase);
            randomizeTestCaseInputValue(suffixedCase, getRandomString(0, false), appendTestCase);
        });

        return table;

        function prepareTestCase(allowDecimals: boolean, passDecimal: boolean): ITestCase {
            const randomNumber = passDecimal ? getRandomFloat() : getRandomNumber();
            return {
                allowDecimals: allowDecimals,
                inputValue: randomNumber.toString(),
                expectedResult: !allowDecimals && passDecimal ? Math.floor(randomNumber) : randomNumber
            };
        }

        function randomizeTestCaseInputValue(
            currentTestCase: ITestCase,
            randomSuffixToAppend: string,
            commonAction: (tc: ITestCase) => void
        ): void {
            expect(currentTestCase).toBeTruthy();
            expect(randomSuffixToAppend).toBeTruthy();
            expect(commonAction).toBeTruthy();

            const initialInputValue = currentTestCase.inputValue;
            commonAction(currentTestCase);

            const firstCopy: ITestCase = { ...currentTestCase, inputValue: initialInputValue + randomSuffixToAppend };
            commonAction(firstCopy);

            const secondCopy: ITestCase = {
                ...currentTestCase,
                inputValue: initialInputValue + ' ' + randomSuffixToAppend
            };
            commonAction(secondCopy);
        }
    }

    each(getTestData()).it('should call the update function on change', (testInput: ITestCase): void => {
        const props = SingleValueInputElementTestHelpers.getRandomProps(getRandomNumber(0, 1000), updateFunction);
        const component = mount(
            <NumberInput {...props} handleDecimalValues={testInput.allowDecimals} suffix={testInput.suffix} />
        );

        const spinButton = component.find(SpinButton);
        EnzymeTestsHelper.expectExists(spinButton);

        const input = spinButton.find(spinButtonInputQuerySelector);
        EnzymeTestsHelper.expectExists(input);

        input.simulate('change', EnzymeTestsHelper.mockEvent(testInput.inputValue));
        expect(updateFunction).toHaveBeenCalledTimes(1);
        expect(updateFunction).toHaveBeenCalledWith(testInput.expectedResult);
    });
});
