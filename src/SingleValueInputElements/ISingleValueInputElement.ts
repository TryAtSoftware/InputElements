import ISingleValueInputElementConfiguration from './ISingleInputElementConfiguration';
import ISingleValueInputElementProps from './ISingleValueInputElementProps';
import { IValueInputElement } from '../IInputElement';

export type ValidationRule<TValue> = (value: TValue) => string;

export default interface ISingleValueInputElement<TValue, TComponentProps = unknown>
    extends IValueInputElement<TValue> {
    /**
     * The configuration that should be used for that input element.
     */
    configuration: ISingleValueInputElementConfiguration;

    /**
     * The message of the first validation error that occurred if any.
     */
    errorMessage: string;

    /**
     * Collection of validation rules that are executed whenever the entered value has changed.
     */
    validationRules: ValidationRule<TValue>[];

    /**
     * A component containing the front-end part of the input element (all that is visible to the end user).
     * It should accept all necessary props for realizing the communication between the visual and the logical part of the input element.
     * It may also accept other props of type 'TComponentProps' stored in the 'componentProps' property.
     *
     * @see React.Component
     */
    componentToRender: React.ComponentType<ISingleValueInputElementProps<TValue> & TComponentProps>;

    /**
     * A property containing all additional props that the rendered component needs.
     * They should be initialized before the 'render' method is ever called (the best way of doing that is by passing them into the constructor).
     */
    componentProps: TComponentProps;

    /**
     * This method is called every time after the entered value has changed.
     * Its main purpose is to call every single validation rule and update the error message if some of them has failed.
     */
    validate(): void;

    /**
     * A method used to set new value, validate it and update the form.
     *
     * @param value             The new value of the input element.
     */
    setValue(value: TValue): void;

    /**
     * Use this method to set an initial value to the input element.
     * This should be useful for update operations.
     */
    setInitialValue(value: TValue): void;
}
