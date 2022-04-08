import { FormText } from './Components';

export interface IInputElementConfiguration {
    /**
     * The label associated with the input element.
     * It should not be too long and should give enough information for the end user.
     * Some input elements may not use this value if tey should not.
     */
    label?: FormText;

    /**
     * A class name that should be used while rendering the input element.
     */
    className?: string;

    /**
     * A predefined rule indicating if the input element is required.
     * If it is required and no value is provided, an error message should be rendered.
     * If it is not required and no value is provided, no validation rules should be run and respectively no error message should be rendered.
     * If it is not required but a value is provided, all validation rules should be executed and if any fails, an error message should be rendered.
     */
    isRequired: boolean;

    /**
     * A message that should be rendered instead of the default one whenever a required input element is empty.
     */
    requiredValidationMessage?: FormText;
}
