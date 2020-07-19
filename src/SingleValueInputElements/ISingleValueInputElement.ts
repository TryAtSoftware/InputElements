import IChangingInputElement from '../IChangingInputElement';
import IConfigurableInputElement from '../IConfigurableInputElement';
import IHidingInputElement from '../IHidingInputElement';
import ILoadingInputElement from '../ILoadingInputElement';
import ISingleValueInputElementConfiguration from './ISingleInputElementConfiguration';
import ISingleValueInputElementProps from './ISingleValueInputElementProps';
import { IValueInputElement } from '../IValueInputElement';

export default interface ISingleValueInputElement<TValue, TComponentProps = unknown>
    extends IValueInputElement<TValue>,
        IConfigurableInputElement<ISingleValueInputElementConfiguration>,
        IChangingInputElement<TValue>,
        IHidingInputElement,
        ILoadingInputElement {
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
}
