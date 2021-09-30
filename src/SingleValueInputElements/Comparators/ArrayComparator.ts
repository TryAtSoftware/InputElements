import { DefaultEqualityComparer } from './DefaultEqualityComparer';
import { IEqualityComparer } from './IEqualityComparer';
import { IValueComparator } from './IValueComparator';

export class ArrayComparator<T> implements IValueComparator<T[]> {
    private readonly _equalityComparer: IEqualityComparer<T>;

    public constructor(equalityComparer: IEqualityComparer<T> = null) {
        this._equalityComparer = equalityComparer ?? new DefaultEqualityComparer<T>();
    }

    /** @inheritdoc */
    public areEqual(a: T[], b: T[]): boolean {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; ++i) {
            if (!this._equalityComparer.areEqual(a[i], b[i])) return false;
        }

        return true;
    }

    /** @inheritdoc */
    public isValid(value: T[]): boolean {
        return !!value && value.length > 0;
    }
}
