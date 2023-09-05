import { IBaseInputElementProps } from '../IBaseInputElementProps';

export interface ITimePickerProps extends IBaseInputElementProps {
    inputClassName?: string;
    clearButtonClassName?: string;

    formatDate?: (date: Date) => string;
    showGoToToday?: boolean;
    showMonthPicker?: boolean;
    startWeekOnSunday?: boolean;
}
