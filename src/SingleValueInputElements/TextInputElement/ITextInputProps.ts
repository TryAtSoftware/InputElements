import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IBaseInputElementProps } from '../IBaseInputElementProps';

export interface ITextInputProps extends IBaseInputElementProps, IBaseInputElementDynamicProps {
    contentType?: string;
}
