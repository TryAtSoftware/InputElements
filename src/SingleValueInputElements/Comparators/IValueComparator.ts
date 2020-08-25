export interface IValueComparator<T> {
    areEqual(a: T, b: T): boolean;
    isValid(value: T): boolean;
}
