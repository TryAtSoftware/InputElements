export interface IValueComparator<T> {
    areEqual(a: T, b: T): boolean;
}
