import * as React from 'react';
import { MessageBarType, SpinButton } from '@fluentui/react';
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

        const { dynamicProps, errorMessage, operativeProps } = this.props;
        const { customWarning } = this.state;

        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
                <SpinButton
                    data-automationid="number-input"
                    inputProps={{
                        autoFocus: !!operativeProps.autoFocus,
                        placeholder: operativeProps.placeholder,
                        disabled: !!dynamicProps.isDisabled,
                        onChange: this.handleChange
                    }}
                    value={this.state.intermediateValue ?? ''}
                    onIncrement={this.handleIncrement}
                    onDecrement={this.handleDecrement}
                />
                <ErrorRenderer error={errorMessage} messageBarType={MessageBarType.warning} />
                <ErrorRenderer error={customWarning} messageBarType={MessageBarType.warning} />
            </>
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const newValue = event.target.value;
        const value = NumberInput.normalizeData(newValue);

        const { isRequired } = this.props;
        console.log(isRequired, value);
        if (!isRequired && !value) {
            this.setState({ intermediateValue: '', customWarning: '' });
            this.props.onChange(undefined);
            return;
        }

        if (!value || isNaN(Number(value))) {
            this.setState({ intermediateValue: value, customWarning: 'The provided value is not a valid number.' });
            this.props.invalidateInput();
            return;
        }

        const numericValue = NumberInput.getNumericValue(value);
        this.handleUserInput(numericValue, value);
    };

    private handleIncrement = (value: string): void => {
        let numericValue = NumberInput.getNumericValue(value);
        numericValue += this.getStep();
        this.handleUserInput(numericValue, numericValue.toString());
    };

    private handleDecrement = (value: string): void => {
        let numericValue = NumberInput.getNumericValue(value);
        numericValue -= this.getStep();
        this.handleUserInput(numericValue, numericValue.toString());
    };

    private handleUserInput(value: number, intermediateValue: string): void {
        const consistencyWarning = this.ensureValueConsistency(value);
        this.setState({ customWarning: consistencyWarning, intermediateValue: intermediateValue });

        if (consistencyWarning === undefined) this.props.onChange(value);
        else this.props.invalidateInput();
    }

    private ensureValueConsistency(value: number): FormText | undefined {
        const { operativeProps } = this.props;

        const maxValue = this.getMaxValue();
        const minValue = this.getMinValue();

        if (value > maxValue) return operativeProps.getMaxErrorMessage?.(minValue, maxValue) ?? `The maximum value is ${maxValue}`;
        if (value < minValue) return operativeProps.getMinErrorMessage?.(minValue, maxValue) ?? `The minimum value is ${minValue}`;
        if (!operativeProps.handleDecimalValues && value % 1 !== 0)
            return operativeProps.decimalErrorMessage ?? 'Decimal values are not allowed';

        return undefined;
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
