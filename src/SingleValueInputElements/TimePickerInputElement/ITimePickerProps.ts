import { IBaseInputElementProps } from '../IBaseInputElementProps';

export interface ITimePickerProps extends IBaseInputElementProps {
    formatDate?: (date: Date) => string;
    showGoToToday?: boolean;
    showMonthPicker?: boolean;
    startWeekOnSunday?: boolean;
}
