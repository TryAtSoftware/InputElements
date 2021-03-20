import { MessageBar, MessageBarType, SpinButton } from 'office-ui-fabric-react';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import * as React from 'react';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { INumberInputProps } from './INumberInputProps';

interface INumberInputState {
    intermediateValue: string;
    customWarning: string;
}

const delimiter = '.';

export class NumberInput extends React.Component<ISingleValueInputElementProps<number> & INumberInputProps, INumberInputState> {
    public state: INumberInputState = {
        intermediateValue: this.props.value?.toString(),
        customWarning: ''
    };

    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <>
                {/* For some reason the Fluent-UI styles for the placeholders in every other component differ from the SpinButton defaults so we should override them'. */}
                <SpinButton
                    styles={{
                        input: {
                            fontFamily: '"Segoe UI", "Segoe UI Web (West European)"',
                            fontSize: 14,
                            fontWeight: 400
                        }
                    }}
                    inputProps={{
                        autoFocus: this.props.autoFocus,
                        placeholder: this.props.placeholder,
                        disabled: this.props.isDisabled
                    }}
                    label={this.props.label}
                    value={this.state.intermediateValue ?? ''}
                    labelPosition={Position.top}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        const value = NumberInput.normalizeData(event?.target?.value);
                        const changeResult = this.handleUserInput(value);

                        this.setState({ intermediateValue: value, customWarning: changeResult.warning });
                        this.props.onChange(changeResult.newValue);
                    }}
                    // We should obligatorily define this function, because there will be a problem with incrementing/decrementing a newly typed value.
                    onValidate={(): string => this.state.intermediateValue}
                    onIncrement={(value: string): void => {
                        let numericValue = this.getNumericValue(value);
                        numericValue += this.getStep();

                        const changeResult = this.ensureValueConsistency(numericValue);
                        this.setState({ customWarning: changeResult.warning, intermediateValue: numericValue.toString() });
                        this.props.onChange(changeResult.newValue);
                    }}
                    onDecrement={(value: string): void => {
                        let numericValue = this.getNumericValue(value);
                        numericValue -= this.getStep();

                        const changeResult = this.ensureValueConsistency(numericValue);
                        this.setState({ customWarning: changeResult.warning, intermediateValue: numericValue.toString() });
                        this.props.onChange(changeResult.newValue);
                    }}
                />
                {!!this.props?.errorMessage && <MessageBar messageBarType={MessageBarType.warning}>{this.props.errorMessage}</MessageBar>}
                {!!this.state.customWarning && <MessageBar messageBarType={MessageBarType.warning}>{this.state.customWarning}</MessageBar>}
            </>
        );
    }

    private handleUserInput(value: string): { warning: string; newValue: number } {
        if (!value || isNaN(Number(value))) return { warning: '', newValue: undefined };

        if (value.includes(delimiter)) {
            if (!this.props.handleDecimalValues) return { warning: 'Decimal values are not allowed', newValue: undefined };

            const maxPrecision = this.getPrecision();
            if (value.substr(value.indexOf(delimiter) + 1).length > maxPrecision)
                return { warning: `Maximum ${maxPrecision} decimal places are supported.`, newValue: undefined };
        }

        return this.ensureValueConsistency(this.getNumericValue(value));
    }

    private ensureValueConsistency(value: number): { warning: string; newValue: number } {
        let customWarning: string = null;

        const maxValue = this.getMaxValue();
        const minValue = this.getMinValue();
        if (value > maxValue) customWarning = `The maximum value is ${maxValue}`;
        else if (value < minValue) customWarning = `The minimum value is ${minValue}`;

        return { warning: customWarning, newValue: !!customWarning ? undefined : value };
    }

    private getNumericValue(value: string): number {
        let normalizedValue = NumberInput.normalizeData(value);

        const delimiterIndex = normalizedValue.indexOf(delimiter);
        if (delimiterIndex !== -1) {
            const precision = this.getPrecision();
            const decimalCharactersCount = precision === 0 ? 0 : 1 + precision;
            normalizedValue = normalizedValue.substr(0, delimiterIndex + decimalCharactersCount);
        }

        const number = this.props.handleDecimalValues ? Number.parseFloat(normalizedValue) : Number.parseInt(normalizedValue);
        if (Number.isNaN(number)) return 0;

        return number;
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

    private static normalizeData(value: string): string {
        return value?.replace(',', delimiter);
    }
}
