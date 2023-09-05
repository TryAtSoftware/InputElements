import { FormText } from '../../Components';
import { IBaseInputElementProps } from '../IBaseInputElementProps';

export interface INumberInputProps extends IBaseInputElementProps {
    handleDecimalValues?: boolean;
    min?: number;
    max?: number;
    step?: number;

    getMinErrorMessage?: (min: number, max: number | undefined) => FormText;
    getMaxErrorMessage?: (min: number | undefined, max: number) => FormText;
    decimalErrorMessage?: FormText;
}
