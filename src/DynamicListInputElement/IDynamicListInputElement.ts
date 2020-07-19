import IChangingInputElement from '../IChangingInputElement';
import IConfigurableInputElement from '../IConfigurableInputElement';
import IDynamicListInputElementConfiguration from './IDynamicListInputElementConfiguration';
import IDynamicListMenuOption from './Menu/IDynamicListMenuOption';
import IHidingInputElement from '../IHidingInputElement';
import ILoadingInputElement from '../ILoadingInputElement';
import ISingleValueInputElement from '../SingleValueInputElements/ISingleValueInputElement';
import { IValueInputElement } from '../IValueInputElement';

export default interface IDynamicListInputElement<TValue>
    extends IValueInputElement<Array<TValue>>,
        IConfigurableInputElement<IDynamicListInputElementConfiguration>,
        IChangingInputElement<Array<IDynamicValueChange<TValue>>>,
        IHidingInputElement,
        ILoadingInputElement {
    inputOptions: Array<IDynamicListMenuOption<TValue>>;
    inputs: Array<ISingleValueInputElement<TValue>>;
}

export interface IDynamicValueChange<TValue> {
    value: TValue;
    inputCreationCallback: () => ISingleValueInputElement<TValue>;
}
