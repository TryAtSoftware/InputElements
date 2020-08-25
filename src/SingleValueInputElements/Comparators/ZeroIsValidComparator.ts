import { IValueComparator } from './IValueComparator';

export class ZeroIsValidComparator implements IValueComparator<number> {
    /** @inheritDoc */
    public areEqual(a: number, b: number): boolean {
        return a === b;
    }

    /** @inheritDoc */
    public isValid(value: number): boolean {
        return !!value || value === 0;
    }
}
