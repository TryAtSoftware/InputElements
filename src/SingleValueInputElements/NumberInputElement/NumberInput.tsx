import * as React from 'react';
import { MessageBar, MessageBarType, SpinButton } from 'office-ui-fabric-react';
import { INumberInputProps } from './INumberInputProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';

export class NumberInput extends React.Component<ISingleValueInputElementProps<number> & INumberInputProps> {
    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <>
                <SpinButton
                    inputProps={{
                        autoFocus: this.props.autoFocus,
                        placeholder: this.props.placeholder,
                        disabled: this.props.isDisabled
                    }}
                    label={this.props.label}
                    labelPosition={this.getLabelPosition()}
                    value={this.getValue(this.props.value)}
                    onValidate={(newValue: string): void => {
                        this.processValue(newValue);
                    }}
                    onIncrement={(value: string): string => {
                        let numericValue = this.removeSuffixFromNumber(value);
                        numericValue += this.getStep();

                        this.props.onChange(numericValue);
                        return this.getValue(numericValue);
                    }}
                    onDecrement={(value: string): string => {
                        let numericValue = this.removeSuffixFromNumber(value);
                        numericValue -= this.getStep();

                        this.props.onChange(numericValue);
                        return this.getValue(numericValue);
                    }}
                />
                {!!this.props?.errorMessage && <MessageBar messageBarType={MessageBarType.warning}>{this.props.errorMessage}</MessageBar>}
            </>
        );
    }

    private getValue(value: number): string {
        if (!!value === false) value = 0;

        const stringifiedValue = value.toFixed(this.getPrecision());
        return !!this.props.suffix ? stringifiedValue + ' ' + this.props.suffix : stringifiedValue.toString();
    }

    private getLabelPosition(): Position {
        switch (this.props?.labelPosition) {
            case 'bottom':
                return Position.bottom;
            case 'left':
                return Position.start;
            case 'right':
                return Position.end;
            default:
                return Position.top;
        }
    }

    private removeSuffixFromNumber(value: string): number {
        const numberValue = this.getNumericValue(this.removeSuffix(value));
        return Number.isNaN(numberValue) ? 0 : numberValue;
    }

    private removeSuffix(value: string): string {
        if (!!value === false) value = '0';

        if (!!this.props.suffix === false || value.length <= this.props.suffix.length) return value;

        const valueSuffix = value.substr(value.length - this.props.suffix.length);
        if (valueSuffix != this.props.suffix) return value;

        return value.substr(0, value.length - this.props.suffix.length);
    }

    private getNumericValue(value: string): number {
        const numericValue = this.props.handleDecimalValues ? Number.parseFloat(value.replace(',', '.')) : Number.parseInt(value);

        const maxValue = this.getMaxValue();
        if (numericValue > maxValue) return maxValue;

        const minValue = this.getMinValue();
        if (numericValue < minValue) return minValue;

        return numericValue;
    }

    private processValue(value: string): void {
        const numericValue = this.removeSuffixFromNumber(value);
        this.props.onChange(numericValue);
    }

    private getMaxValue(): number {
        return this.props?.max ?? Number.MAX_SAFE_INTEGER;
    }

    private getMinValue(): number {
        return this.props?.min ?? Number.MIN_SAFE_INTEGER;
    }

    private getStep(): number {
        return this.props?.step ?? 1;
    }

    private getPrecision(): number {
        // If decimal values are not allowed, we should render only whole numbers.
        if (!this.props?.handleDecimalValues) return 0;

        const defaultPrecision = 2;
        const minPrecision = 1;
        const maxPrecision = 20;

        let precision = this.props?.precision ?? defaultPrecision;
        if (precision < minPrecision) precision = minPrecision;
        else if (precision > maxPrecision) precision = maxPrecision;

        return precision;
    }
}
