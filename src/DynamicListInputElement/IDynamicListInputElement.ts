import IDynamicListMenuOption from './Menu/IDynamicListMenuOption';
import ISingleValueInputElement from '../SingleValueInputElements/ISingleValueInputElement';
import { IValueInputElement } from '../IValueInputElement';

export default interface IDynamicListInputElement<TValue> extends IValueInputElement<Array<TValue>> {
    inputOptions: Array<IDynamicListMenuOption<TValue>>;
    inputs: Array<ISingleValueInputElement<TValue>>;
}
