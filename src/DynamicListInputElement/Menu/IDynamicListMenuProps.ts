import IDynamicListMenuOption from './IDynamicListMenuOption';
import ISingleValueInputElement from '../../SingleValueInputElements/ISingleValueInputElement';

export default interface IDynamicListMenuProps<TValue> {
    options: Array<IDynamicListMenuOption<TValue>>;
    onAddClicked: (createdInput: ISingleValueInputElement<TValue>) => void;
    onRemoveClicked: () => void;
    showRemoveButton: boolean;
}
