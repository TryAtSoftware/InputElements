export interface IEqualityComparer<T> {
    areEqual(a: T, b: T): boolean;
}
