import { DatePicker, DayOfWeek } from '@fluentui/react';
import * as React from 'react';
import { ClearButton, LabelRenderer, materializeErrorMessage } from '../../Components';
import { combineClasses } from '../../Utilities';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IDynamicProps } from '../IDynamicProps';
import { IOperativeProps } from '../IOperativeProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { ITimePickerProps } from './ITimePickerProps';
import './TimePicker.less';

export class TimePicker extends React.Component<
    ISingleValueInputElementProps<Date> & IOperativeProps<ITimePickerProps> & IDynamicProps<IBaseInputElementDynamicProps>
> {
    public render(): JSX.Element {
        if (!this.props) return null;

        const { dynamicProps, operativeProps } = this.props;

        const clearButtonClassName = combineClasses('q-clear-button', operativeProps.clearButtonClassName);
        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
                <DatePicker
                    data-automationid="time-input"
                    placeholder={operativeProps.placeholder}
                    onSelectDate={this.onChange}
                    textField={{
                        onRenderSuffix: (): JSX.Element => <ClearButton onClick={this.clearDate} className={clearButtonClassName} />,
                        inputClassName: operativeProps.inputClassName,
                        errorMessage: materializeErrorMessage(this.props.errorMessage),
                        disabled: dynamicProps.isDisabled
                    }}
                    showGoToToday={!!operativeProps.showGoToToday}
                    formatDate={operativeProps.formatDate}
                    firstDayOfWeek={!!operativeProps.startWeekOnSunday ? DayOfWeek.Sunday : DayOfWeek.Monday}
                    isMonthPickerVisible={!!operativeProps.showMonthPicker}
                    highlightSelectedMonth={!!operativeProps.showMonthPicker}
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
