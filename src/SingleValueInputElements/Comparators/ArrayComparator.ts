import { IValueComparator } from './IValueComparator';

export class ArrayComparator<T> implements IValueComparator<T[]> {
    /** @inheritdoc */
    public areEqual(a: T[], b: T[]): boolean {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }

        return true;
    }
}
