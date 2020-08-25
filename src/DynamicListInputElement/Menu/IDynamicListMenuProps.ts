import { IDynamicListMenuConfiguration } from '../IDynamicListMenuConfiguration';
import { IDynamicListMenuOption } from './IDynamicListMenuOption';
import { InternalDynamicInput } from '../IDynamicListInputElement';

export interface IDynamicListMenuProps<TValue> extends IDynamicListMenuConfiguration {
    options: IDynamicListMenuOption<TValue>[];
    onAddClicked?: (createdInput: InternalDynamicInput<TValue>) => void;
    onRemoveClicked?: () => void;
}
