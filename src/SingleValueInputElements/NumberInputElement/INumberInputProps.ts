import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IBaseInputElementProps } from '../IBaseInputElementProps';

export interface INumberInputProps extends IBaseInputElementProps, IBaseInputElementDynamicProps {
    handleDecimalValues?: boolean;
    min?: number;
    max?: number;
    step?: number;
}
