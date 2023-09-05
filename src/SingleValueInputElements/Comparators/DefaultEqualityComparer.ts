import { IEqualityComparer } from './IEqualityComparer';

export class DefaultEqualityComparer<T> implements IEqualityComparer<T> {
    public areEqual(a: T, b: T): boolean {
        return a === b;
    }
}
