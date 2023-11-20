import { FormText } from '../Components';

export interface IInvalidationOptions {
    errorMessage: FormText;
}

export interface ISingleValueInputElementProps<TValue> {
    value: TValue;
    label: FormText;
    isRequired: boolean;
    renderRequiredIndicator: boolean;
    errorMessage: FormText;
    onChange: (newValue: TValue) => void;
    invalidateInput: (options?: IInvalidationOptions) => void;
}
