import { DatePicker, DayOfWeek } from '@fluentui/react';
import * as React from 'react';
import { ClearButton, LabelRenderer, materializeErrorMessage } from '../../Components';
import { combineClasses } from '../../Utilities';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { ITimePickerProps } from './ITimePickerProps';
import './TimePicker.less';

export class TimePicker extends React.Component<ISingleValueInputElementProps<Date> & ITimePickerProps & IBaseInputElementDynamicProps> {
    public render(): JSX.Element {
        if (!this.props) return null;

        const clearButtonClassName = combineClasses('q-clear-button', this.props.clearButtonClassName);
        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
                <DatePicker
                    data-automationid="time-input"
                    placeholder={this.props.placeholder}
                    onSelectDate={this.onChange}
                    textField={{
                        onRenderSuffix: (): JSX.Element => <ClearButton onClick={this.clearDate} className={clearButtonClassName} />,
                        inputClassName: this.props.inputClassName,
                        errorMessage: materializeErrorMessage(this.props.errorMessage),
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
