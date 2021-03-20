// import { ISingleValueInputElement } from '../ISingleValueInputElement';
// import { UpdateType } from '../../UpdateType';
//
// export class DependentInputElementInitializer {
//     public static initializeDependency<TDependent, TPrincipal, TDependentProps = unknown, TPrincipalProps = unknown>(
//         principal: ISingleValueInputElement<TPrincipal, TPrincipalProps>,
//         dependent: ISingleValueInputElement<TDependent, TDependentProps>,
//         onPrincipalValueChanged: (newValue: TPrincipal, doneCallback: () => void) => void,
//         handleFalsyPrincipalValue?: () => void,
//         handleInitialRender?: () => void
//     ): void {
//         if (!dependent || !principal || !onPrincipalValueChanged) return;
//
//         // If the dependent input element is required, this means that the principal should be required as well.
//         if (!!dependent.configuration?.isRequired) {
//             if (!principal.configuration) principal.configuration = { isRequired: true };
//             else principal.configuration.isRequired = true;
//         }
//
//         const originalUpdateFunction = principal.update;
//         principal.update = (updateType: UpdateType): void => {
//             if (!!originalUpdateFunction) originalUpdateFunction(updateType);
//
//             if (updateType === UpdateType.System) {
//                 // Handle the system events - loading/ hiding an input element.
//                 if (principal.isLoading || !principal.isVisible) dependent.hide();
//                 else dependent.show();
//             } else {
//                 dependent.resetValue();
//                 if (!!principal.value === false) {
//                     // If the falsy value is handled explicitly, execute that callback.
//                     // In every other case, hide the dependent component.
//                     if (!!handleFalsyPrincipalValue) handleFalsyPrincipalValue();
//                     else if (dependent.isVisible) dependent.hide();
//                 } else {
//                     // Ensure that the dependent input element is visible.
//                     if (!dependent.isVisible) dependent.show();
//
//                     dependent.load((finish: () => void): void => {
//                         onPrincipalValueChanged(principal.value, finish);
//                     });
//                 }
//             }
//         };
//
//         // If a callback to handle the initial render is passed, execute it.
//         // Else, hide the input element.
//         if (!!handleInitialRender) handleInitialRender();
//         else dependent.hide();
//     }
// }
