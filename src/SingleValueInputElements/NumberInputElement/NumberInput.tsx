import * as React from 'react';
import { MessageBar, MessageBarType, SpinButton } from 'office-ui-fabric-react';
import INumberInputProps from './INumberInputProps';
import ISingleValueInputElementProps from '../ISingleValueInputElementProps';

export default class NumberInput extends React.Component<ISingleValueInputElementProps<number> & INumberInputProps> {
    public render(): JSX.Element {
        return (
            <>
                <SpinButton
                    value={this.appendSuffix(this.props.value)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                        this.processValue(event?.target?.value);
                    }}
                    onValidate={(newValue: string): void => {
                        this.processValue(newValue);
                    }}
                    onIncrement={(value: string): string => {
                        let numericValue = this.removeSuffixFromNumber(value);
                        numericValue += 1;

                        this.props.onChange(numericValue);
                        return this.appendSuffix(numericValue);
                    }}
                    onDecrement={(value: string): string => {
                        let numericValue = this.removeSuffixFromNumber(value);
                        numericValue -= 1;

                        this.props.onChange(numericValue);
                        return this.appendSuffix(numericValue);
                    }}
                    placeholder={this.props.placeholder}
                    min={Number.MIN_SAFE_INTEGER}
                    max={Number.MAX_SAFE_INTEGER}
                />
                {!!this.props?.errorMessage && (
                    <MessageBar messageBarType={MessageBarType.warning}>{this.props.errorMessage}</MessageBar>
                )}
            </>
        );
    }

    private appendSuffix(value: number): string {
        if (!!value === false) value = 0;

        return !!this.props.suffix ? value + ' ' + this.props.suffix : value.toString();
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
        return this.props.handleDecimalValues ? Number.parseFloat(value.replace(',', '.')) : Number.parseInt(value);
    }

    private processValue(value: string): void {
        const numericValue = this.removeSuffixFromNumber(value);
        this.props.onChange(numericValue);
    }
}
