import { IBaseInputElementProps } from '../IBaseInputElementProps';

export interface INumberInputProps extends IBaseInputElementProps {
    suffix?: string;
    handleDecimalValues?: boolean;
    labelPosition?: 'top' | 'bottom' | 'left' | 'right';
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
}
