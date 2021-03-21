import * as React from 'react';
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { ITimePickerProps } from './ITimePickerProps';

export class TimePicker extends React.Component<ISingleValueInputElementProps<Date> & ITimePickerProps> {
    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <>
                <DatePicker
                    label={this.props.label}
                    isRequired={this.props.renderRequiredIndicator}
                    placeholder={this.props.placeholder}
                    onSelectDate={this.onChange}
                    textField={{
                        errorMessage: this.props.errorMessage
                    }}
                    showGoToToday={!!this.props.showGoToToday}
                    formatDate={this.props.formatDate}
                    firstDayOfWeek={this.props.startWeekOnSunday ? DayOfWeek.Sunday : DayOfWeek.Monday}
                    isMonthPickerVisible={!!this.props.showMonthPicker}
                    highlightSelectedMonth={!!this.props.showMonthPicker}
                    value={this.props.value}
                />
            </>
        );
    }

    private onChange = (newValue: Date): void => {
        this.props?.onChange(newValue);
    };
}
