import * as React from 'react';
import { DatePicker, DayOfWeek, Label } from '@fluentui/react';
import { ClearButton } from '../../Components/Buttons/ClearButton';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { ITimePickerProps } from './ITimePickerProps';

export class TimePicker extends React.Component<ISingleValueInputElementProps<Date> & ITimePickerProps & IBaseInputElementDynamicProps> {
    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <>
                {!!this.props?.label && <Label required={!!this.props.renderRequiredIndicator}>{this.props.label}</Label>}
                <DatePicker
                    data-automationid="time-input"
                    placeholder={this.props.placeholder}
                    onSelectDate={this.onChange}
                    textField={{
                        onRenderSuffix: (): JSX.Element => (
                            <ClearButton onClick={this.clearDate} className={this.props.clearButtonClassName} />
                        ),
                        inputClassName: this.props.inputClassName,
                        errorMessage: this.props.errorMessage,
                        disabled: this.props.isDisabled
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

    private clearDate = (): void => {
        this.onChange(null);
    };
}
