import { IValueInputElement } from '../../IInputElement';

export default class DependentInputElementInitializer {
    public static initializeDependency<TDependent, TPrincipal>(
        principal: IValueInputElement<TPrincipal>,
        onPrincipalValueChanged: (newValue: TPrincipal, doneCallback: () => void) => void,
        dependent: IValueInputElement<TDependent>,
        handleFalsyPrincipalValue: () => void
    ): void {
        if (!dependent || !principal || !onPrincipalValueChanged) return;

        const originalUpdateFunction = principal.update;
        principal.update = (isInitial?: boolean): void => {
            if (!!originalUpdateFunction) originalUpdateFunction(isInitial);

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
    }
}
