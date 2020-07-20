import { ISingleValueInputElement } from '../../SingleValueInputElements/ISingleValueInputElement';

export interface IDynamicListMenuOption<TValue> {
    name: string;
    icon?: string;
    createInput: () => ISingleValueInputElement<TValue>;
}
