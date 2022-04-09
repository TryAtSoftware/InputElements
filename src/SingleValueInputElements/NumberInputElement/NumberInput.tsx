import { MessageBarType, SpinButton } from '@fluentui/react';
import * as React from 'react';
import { FormText } from '../../Components';
import { ErrorRenderer, LabelRenderer } from '../../Components';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IDynamicProps } from '../IDynamicProps';
import { IOperativeProps } from '../IOperativeProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { INumberInputProps } from './INumberInputProps';

interface INumberInputState {
    intermediateValue: string;
    customWarning: FormText;
}

const delimiter = '.';

export class NumberInput extends React.Component<
    ISingleValueInputElementProps<number> & IOperativeProps<INumberInputProps> & IDynamicProps<IBaseInputElementDynamicProps>,
    INumberInputState
> {
    public state: INumberInputState = {
        intermediateValue: this.props.value?.toString(),
        customWarning: ''
    };

    public render(): JSX.Element {
        if (!this.props) return null;

        const { dynamicProps, operativeProps } = this.props;

        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
                <SpinButton
                    data-automationid="number-input"
                    inputProps={{
                        autoFocus: !!operativeProps.autoFocus,
                        placeholder: operativeProps.placeholder,
                        disabled: !!dynamicProps.isDisabled,
                        onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
                            const newValue = event.target.value;
                            const value = NumberInput.normalizeData(newValue);
                            if (!value || isNaN(Number(value))) {
                                this.setState({ intermediateValue: value, customWarning: 'The provided value is not a valid number.' });
                                this.props.invalidateInput();
                                return;
                            }

                            const numericValue = NumberInput.getNumericValue(value);
                            this.handleUserInput(numericValue, value);
                        }
                    }}
                    value={this.state.intermediateValue ?? ''}
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
                <ErrorRenderer error={this.props.errorMessage} messageBarType={MessageBarType.warning} />
                <ErrorRenderer error={this.state.customWarning} messageBarType={MessageBarType.warning} />
            </>
        );
    }

    private handleUserInput(value: number, intermediateValue: string): void {
        const changeResult = this.ensureValueConsistency(value);
        this.setState({ customWarning: changeResult.warning, intermediateValue: intermediateValue });

        if (changeResult.newValue !== undefined) this.props.onChange(changeResult.newValue);
        else this.props.invalidateInput();
    }

    private ensureValueConsistency(value: number): {
        warning: string;
        newValue: number;
    } {
        const maxValue = this.getMaxValue();
        if (value > maxValue) return { warning: `The maximum value is ${maxValue}`, newValue: undefined };

        const minValue = this.getMinValue();
        if (value < minValue) return { warning: `The minimum value is ${minValue}`, newValue: undefined };

        const { operativeProps } = this.props;
        if (!operativeProps.handleDecimalValues && value % 1 !== 0)
            return {
                warning: 'Decimal values are not allowed',
                newValue: undefined
            };

        return { warning: '', newValue: value };
    }

    private getMaxValue(): number {
        const { operativeProps } = this.props;
        return operativeProps.max ?? Number.MAX_SAFE_INTEGER;
    }

    private getMinValue(): number {
        const { operativeProps } = this.props;
        return operativeProps.min ?? Number.MIN_SAFE_INTEGER;
    }

    private getStep(): number {
        const { operativeProps } = this.props;
        return operativeProps.step ?? 1;
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
