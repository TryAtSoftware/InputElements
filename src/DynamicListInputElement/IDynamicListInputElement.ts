import { IChangingInputElement } from '../IChangingInputElement';
import { IHidingInputElement } from '../IHidingInputElement';
import { ILoadingInputElement } from '../ILoadingInputElement';
import { IValueInputElement } from '../IValueInputElement';
import { IDynamicListMenuOption } from './Menu';

export interface IDynamicListInputElement<TValue>
    extends IValueInputElement<TValue[]>,
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
