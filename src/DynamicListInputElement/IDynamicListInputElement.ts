import { IChangingInputElement } from '../IChangingInputElement';
import { IConfigurableInputElement } from '../IConfigurableInputElement';
import { IDynamicListInputElementConfiguration } from './IDynamicListInputElementConfiguration';
import { IDynamicListMenuOption } from './Menu/IDynamicListMenuOption';
import { IHidingInputElement } from '../IHidingInputElement';
import { ILoadingInputElement } from '../ILoadingInputElement';
import { IValueInputElement } from '../IValueInputElement';

export interface IDynamicListInputElement<TValue>
    extends IValueInputElement<TValue[]>,
        IConfigurableInputElement<IDynamicListInputElementConfiguration>,
        IChangingInputElement<IDynamicValueChange<TValue>[]>,
        IHidingInputElement,
        ILoadingInputElement {
    inputOptions: IDynamicListMenuOption<TValue>[];
    inputs: InternalDynamicInput<TValue>[];
}

export interface IDynamicValueChange<TValue> {
    value: TValue;
    inputCreationCallback: () => InternalDynamicInput<TValue>;
}

export type InternalDynamicInput<TValue> = IValueInputElement<TValue> & IChangingInputElement<TValue>;
