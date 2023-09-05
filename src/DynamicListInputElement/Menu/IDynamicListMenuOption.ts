import { InternalDynamicInput } from '../IDynamicListInputElement';

export interface IDynamicListMenuOption<TValue> {
    name: string;
    icon?: string;
    createInput: () => InternalDynamicInput<TValue>;
}
