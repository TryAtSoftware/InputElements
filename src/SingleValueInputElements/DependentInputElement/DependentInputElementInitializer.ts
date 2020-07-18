import { IValueInputElement } from '../../IValueInputElement';
import UpdateType from '../../UpdateType';

export default class DependentInputElementInitializer {
    public static initializeDependency<TDependent, TPrincipal>(
        principal: IValueInputElement<TPrincipal>,
        dependent: IValueInputElement<TDependent>,
        onPrincipalValueChanged: (newValue: TPrincipal, doneCallback: () => void) => void,
        handleFalsyPrincipalValue?: () => void,
        handleInitialRender?: () => void
    ): void {
        if (!dependent || !principal || !onPrincipalValueChanged) return;

        const originalUpdateFunction = principal.update;
        principal.update = (updateType: UpdateType): void => {
            if (!!originalUpdateFunction) originalUpdateFunction(updateType);

            if (!!principal.value === false) {
                // If the falsy value is handled explicitly, execute that callback.
                // In every other case, hide the dependent component.
                if (!!handleFalsyPrincipalValue) handleFalsyPrincipalValue();
                else if (dependent.isVisible) dependent.hide();
            } else {
                // Ensure that the dependent input element is visible.
                if (!dependent.isVisible) dependent.show();
                dependent.load((finish: () => void): void => {
                    onPrincipalValueChanged(principal.value, finish);
                });
            }
        };

        // If a callback to handle the initial render is passed, execute it.
        // Else, hide the input element.
        if (!!handleInitialRender) handleInitialRender();
        else dependent.hide();
    }
}
