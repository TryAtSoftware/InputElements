import { FormText } from '../Components';

export interface ISingleValueInputElementProps<TValue> {
    value: TValue;
    label: FormText;
    renderRequiredIndicator: boolean;
    errorMessage: FormText;
    onChange: (newValue: TValue) => void;
    invalidateInput: () => void;
}
