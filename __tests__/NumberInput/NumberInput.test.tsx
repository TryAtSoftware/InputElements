import * as React from 'react';
import { getRandomProbability, getRandomString } from '../_testsCommon';
import { mount } from 'enzyme';
import NumberInput from '../../src/SingleValueInputElements/NumberInputElement/NumberInput';
import { SpinButton } from 'office-ui-fabric-react';

describe('Number input', () => {
    const spinButtonInputQuerySelector = 'input.ms-spinButton-input';
    const updateFunction = jest.fn<void, [number]>();

    beforeEach((): void => {
        updateFunction.mockReset();
    });

    it('should render correctly', () => {
        const component = mount(
            <NumberInput
                value={1}
                label={getRandomString()}
                isRequired={getRandomProbability()}
                errorMessage={getRandomString()}
                onChange={updateFunction}
            />
        );

        expect(component).toBeTruthy();
        expect(updateFunction).toHaveBeenCalledTimes(0);
    });

    it('should call the update function on change', (): void => {
        const component = mount(
            <NumberInput
                value={1}
                label={getRandomString()}
                isRequired={getRandomProbability()}
                errorMessage={getRandomString()}
                onChange={updateFunction}
            />
        );

        const spinButton = component.find(SpinButton);
        expect(spinButton).toBeTruthy();
        expect(spinButton.length).toEqual(1);

        const input = spinButton.find(spinButtonInputQuerySelector);
        expect(input).toBeTruthy();
        expect(input.length).toEqual(1);

        input.simulate('change', { target: { value: '12.7' } });
        expect(updateFunction).toHaveBeenCalledTimes(1);
        expect(updateFunction).toHaveBeenCalledWith(12);
    });
});
