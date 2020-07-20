export interface ISingleValueInputElementProps<TValue> {
    value: TValue;
    label: string;
    isRequired: boolean;
    errorMessage: string;
    onChange: (newValue: TValue) => void;
}
