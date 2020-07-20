import { IDynamicListMenuConfiguration } from '../IDynamicListMenuConfiguration';
import { IDynamicListMenuOption } from './IDynamicListMenuOption';
import { ISingleValueInputElement } from '../../SingleValueInputElements/ISingleValueInputElement';

export interface IDynamicListMenuProps<TValue> extends IDynamicListMenuConfiguration {
    options: IDynamicListMenuOption<TValue>[];
    onAddClicked?: (createdInput: ISingleValueInputElement<TValue>) => void;
    onRemoveClicked?: () => void;
}
