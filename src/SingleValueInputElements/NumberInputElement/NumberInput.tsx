import { Label, MessageBar, MessageBarType, SpinButton } from 'office-ui-fabric-react';
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
                {this.props.label && <Label required={this.props.renderRequiredIndicator}>{this.props.label}</Label>}
                <SpinButton
                    data-automationid="number-input"
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
                    value={this.state.intermediateValue ?? ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        const value = NumberInput.normalizeData(event?.target?.value);
                        if (!value || isNaN(Number(value))) {
                            this.setState({ intermediateValue: value });
                            this.props.invalidateInput();
                            return;
                        }

                        const numericValue = NumberInput.getNumericValue(value);
                        this.handleUserInput(numericValue, value);
                    }}
                    // We should obligatorily define this function, because there will be a problem with incrementing/decrementing a newly typed value.
                    onValidate={(): string => this.state.intermediateValue}
                    onIncrement={(value: string): void => {
                        let numericValue = NumberInput.getNumericValue(value);
                        numericValue += this.getStep();
                        this.handleUserInput(numericValue, numericValue.toString());
                    }}
                    onDecrement={(value: string): void => {
                        let numericValue = NumberInput.getNumericValue(value);
                        numericValue -= this.getStep();
                        this.handleUserInput(numericValue, numericValue.toString());
                    }}
                />
                {!!this.props?.errorMessage && <MessageBar messageBarType={MessageBarType.warning}>{this.props.errorMessage}</MessageBar>}
                {!!this.state.customWarning && <MessageBar messageBarType={MessageBarType.warning}>{this.state.customWarning}</MessageBar>}
            </>
        );
    }

    private handleUserInput(value: number, intermediateValue: string): void {
        const changeResult = this.ensureValueConsistency(value);
        this.setState({ customWarning: changeResult.warning, intermediateValue: intermediateValue });

        if (changeResult.newValue !== undefined) this.props.onChange(changeResult.newValue);
        else this.props.invalidateInput();
    }

    private ensureValueConsistency(
        value: number
    ): {
        warning: string;
        newValue: number;
    } {
        const maxValue = this.getMaxValue();
        if (value > maxValue) return { warning: `The maximum value is ${maxValue}`, newValue: undefined };

        const minValue = this.getMinValue();
        if (value < minValue) return { warning: `The minimum value is ${maxValue}`, newValue: undefined };

        if (!this.props.handleDecimalValues && value % 1 !== 0)
            return {
                warning: 'Decimal values are not allowed',
                newValue: undefined
            };

        return { warning: '', newValue: value };
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

    private static getNumericValue(value: string): number {
        const number = Number(NumberInput.normalizeData(value));
        if (Number.isNaN(number)) return 0;

        return number;
    }

    private static normalizeData(value: string): string {
        return value?.replace(',', delimiter);
    }
}
