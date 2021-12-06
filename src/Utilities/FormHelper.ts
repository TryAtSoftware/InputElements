import { IInputElement } from '../IInputElement';

export function getFormState(inputs: IInputElement[]): { isValid: boolean; hasChanges: boolean } {
    if (!inputs || !Array.isArray(inputs) || inputs.length <= 0) return { isValid: false, hasChanges: false };

    let isValid = true;
    let hasChanges = false;
    let index = 0;

    while ((isValid || !hasChanges) && index < inputs.length) {
        const currentInput = inputs[index];
        if (!currentInput) {
            isValid = false;
        } else {
            isValid = isValid && currentInput.isValid;
            hasChanges = hasChanges || currentInput.hasChanges;
        }

        index++;
    }

    return {
        isValid,
        hasChanges
    };
}
