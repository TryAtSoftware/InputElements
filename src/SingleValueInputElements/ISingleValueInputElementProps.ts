export interface ISingleValueInputElementProps<TValue> {
    value: TValue;
    label: string;
    renderRequiredIndicator: boolean;
    errorMessage: string;
    onChange: (newValue: TValue) => void;
    invalidateInput: () => void;
}
