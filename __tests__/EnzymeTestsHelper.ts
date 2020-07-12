import { ReactWrapper } from 'enzyme';

export default class EnzymeTestsHelper {
    public static expectExists(component: ReactWrapper, expectedLength = 1): void {
        expect(component).toBeTruthy();
        expect(component.length).toEqual(expectedLength);
    }
}
