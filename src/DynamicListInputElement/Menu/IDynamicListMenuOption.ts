import ISingleValueInputElement from '../../SingleValueInputElements/ISingleValueInputElement';

export default interface IDynamicListMenuOption<TValue> {
    name: string;
    icon?: string;
    createInput: () => ISingleValueInputElement<TValue>;
}
