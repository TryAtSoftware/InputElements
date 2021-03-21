export type ValueChangeSubscription<TValue> = (newValue: TValue) => void;
export type InvalidValueChangeSubscription<TValue> = () => void;
