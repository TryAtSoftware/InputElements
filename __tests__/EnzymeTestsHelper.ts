import { ReactWrapper } from 'enzyme';

export default class EnzymeTestsHelper {
    public static expectExists(component: ReactWrapper, expectedLength = 1): void {
        expect(component).toBeTruthy();
        expect(component.length).toEqual(expectedLength);
    }

    public static mockEvent(value: unknown): unknown {
        return { target: { value: value } };
    }
}
