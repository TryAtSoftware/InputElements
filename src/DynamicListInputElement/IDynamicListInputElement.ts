import IChangingInputElement from '../IChangingInputElement';
import IDynamicListMenuOption from './Menu/IDynamicListMenuOption';
import IHidingInputElement from '../IHidingInputElement';
import ILoadingInputElement from '../ILoadingInputElement';
import ISingleValueInputElement from '../SingleValueInputElements/ISingleValueInputElement';
import { IValueInputElement } from '../IValueInputElement';

export default interface IDynamicListInputElement<TValue>
    extends IValueInputElement<Array<TValue>>,
        IChangingInputElement<Array<IDynamicValueChange<TValue>>>,
        IHidingInputElement,
        ILoadingInputElement {
    inputOptions: Array<IDynamicListMenuOption<TValue>>;
    inputs: Array<ISingleValueInputElement<TValue>>;
}

export interface IDynamicValueChange<TValue> {
    value: TValue;
    inputCreationOption: IDynamicListMenuOption<TValue>;
}
