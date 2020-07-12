import { getRandomProbability, getRandomString } from './_testsCommon';
import ISingleValueInputElementProps from '../src/SingleValueInputElements/ISingleValueInputElementProps';

export interface IAdditionalSingleValuePropsConfiguration {
    label?: string;
    isRequired?: boolean;
    errorMessage?: string;
}

export default class SingleValueInputElementTestHelpers {
    public static getRandomProps<T>(
        value: T,
        updateFunction: (newValue: T) => void,
        additionalConfig?: IAdditionalSingleValuePropsConfiguration
    ): ISingleValueInputElementProps<T> {
        return {
            value: value,
            label: !!additionalConfig ? additionalConfig.label : getRandomString(),
            isRequired: !!additionalConfig ? additionalConfig.isRequired : getRandomProbability(),
            errorMessage: !!additionalConfig ? additionalConfig.errorMessage : getRandomString(),
            onChange: updateFunction
        };
    }
}
