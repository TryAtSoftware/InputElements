export default interface ISingleValueInputElementConfiguration {
    /**
     * The label associated with the input element.
     * It should not be too long and should give enough information for the end user.
     */
    label?: string;

    /**
     * A class name that should be used while rendering the input element.
     */
    className?: string;

    /**
     * A value indicating whether error messages will be rendered by the underlying input element itself.
     * If it is set to false, no error message will be rendered but the validation pipeline will not be changed at all.
     */
    renderErrors: boolean;

    /**
     * A predefined rule indicating if the input element is required.
     * If it is required and no value is provided, an error message should be rendered.
     * If it is not required and no value is provided, no validation rules should be run and respectively no error message should be rendered.
     * If it is not required but a value is provided, all validation rules should be executed and if any fails, an error message should be rendered.
     */
    isRequired: boolean;

    /**
     * A value indicating whether the input element should be validated even if it is not required and empty.
     */
    executeAllValidations?: boolean;
}
