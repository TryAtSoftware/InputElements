export interface IInputElement {
    /**
     * A boolean indicating if the entered value is valid (all validation rules pass).
     */
    isValid: boolean;

    /**
     * The message of the first validation error that occurred if any.
     */
    errorMessage: string;

    /**
     * Gets or sets a value indicating whether the input element has any changes made.
     */
    hasChanges: boolean;

    /**
     * This method should render the 'componentToRender' with all necessary props.
     */
    render(): JSX.Element;

    /**
     * This method should be called every time after the input element has changed.
     * It should not be implemented into the inheriting classes, but instead should be passed as a parameter (into the constructor would be best).
     * You can use it to refresh your form or apply some custom update logic.
     */
    update: UpdateCallback;
}

export type UpdateCallback = () => void;
