import * as React from 'react';
import { emptyStrings, getRandomNumber, getRandomString } from '../_testsCommon';
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

    it('should call the update function on change', (): void => {
        const props = SingleValueInputElementTestHelpers.getRandomProps(getRandomNumber(0, 1000), updateFunction);
        const component = mount(<NumberInput {...props} />);

        const spinButton = component.find(SpinButton);
        EnzymeTestsHelper.expectExists(spinButton);

        const input = spinButton.find(spinButtonInputQuerySelector);
        EnzymeTestsHelper.expectExists(input);

        input.simulate('change', { target: { value: '12.7' } });
        expect(updateFunction).toHaveBeenCalledTimes(1);
        expect(updateFunction).toHaveBeenCalledWith(12);
    });
});
