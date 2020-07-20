import { IChangingInputElement } from '../IChangingInputElement';
import { IConfigurableInputElement } from '../IConfigurableInputElement';
import { IDynamicListInputElementConfiguration } from './IDynamicListInputElementConfiguration';
import { IDynamicListMenuOption } from './Menu/IDynamicListMenuOption';
import { IHidingInputElement } from '../IHidingInputElement';
import { ILoadingInputElement } from '../ILoadingInputElement';
import { ISingleValueInputElement } from '../SingleValueInputElements/ISingleValueInputElement';
import { IValueInputElement } from '../IValueInputElement';

export interface IDynamicListInputElement<TValue>
    extends IValueInputElement<TValue[]>,
        IConfigurableInputElement<IDynamicListInputElementConfiguration>,
        IChangingInputElement<IDynamicValueChange<TValue>[]>,
        IHidingInputElement,
        ILoadingInputElement {
    inputOptions: IDynamicListMenuOption<TValue>[];
    inputs: ISingleValueInputElement<TValue>[];
}

export interface IDynamicValueChange<TValue> {
    value: TValue;
    inputCreationCallback: () => ISingleValueInputElement<TValue>;
}
