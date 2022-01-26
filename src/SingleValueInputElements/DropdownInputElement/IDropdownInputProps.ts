import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IDropdownInputOption } from './IDropdownInputOption';

export interface IDropdownInputProps extends IBaseInputElementDynamicProps {
    options?: IDropdownInputOption[];

    /**
     * The default option for the dropdown.
     */
    defaultOption?: IDropdownInputOption;
    renderProps?: IDropdownInputRenderingProps;
}

export interface IDropdownInputRenderingProps {
    pagePadding?: number;
    allowPositionChanges?: boolean;
}
