import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IBaseInputElementProps } from '../IBaseInputElementProps';

export interface ITimePickerProps extends IBaseInputElementProps, IBaseInputElementDynamicProps {
    formatDate?: (date: Date) => string;
    showGoToToday?: boolean;
    showMonthPicker?: boolean;
    startWeekOnSunday?: boolean;
}
