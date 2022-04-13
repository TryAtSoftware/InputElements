export type ValueChangeSubscription<TValue> = (newValue: TValue, previousValue: TValue) => void;
export type InvalidValueChangeSubscription = () => void;
