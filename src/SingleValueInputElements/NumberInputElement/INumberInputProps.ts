import { IBaseInputElementProps } from '../IBaseInputElementProps';

export interface INumberInputProps extends IBaseInputElementProps {
    suffix?: string;
    handleDecimalValues?: boolean;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
}
