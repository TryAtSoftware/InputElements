import IBasicMenuButtonConfiguration from './IBasicMenuButtonConfiguration';
import IInputElementConfiguration from '../IInputElementConfiguration';
import ILoadingInputElementConfiguration from '../ILoadingInputElementConfiguration';

export default interface IDynamicListInputElementConfiguration
    extends IInputElementConfiguration,
        ILoadingInputElementConfiguration {
    removeButtonConfig?: IBasicMenuButtonConfiguration;
    insertButtonConfig?: IBasicMenuButtonConfiguration;
    addButtonConfig?: IBasicMenuButtonConfiguration;

    renderMoveGripper?: () => JSX.Element;

    /**
     * If this value os set to true, it will overwrite the menu configuration.
     * This is implemented for easier initialization of the dynamic list input element.
     */
    canRemoveValues?: boolean;

    /**
     * A value indicating whether the `Remove` button (if such exists) should be disabled when there is only one input left.
     */
    canRemoveAllInputs?: boolean;

    /**
     * If this value os set to true, it will overwrite the menu configuration.
     * This is implemented for easier initialization of the dynamic list input element.
     */
    canInsertValues?: boolean;
}
