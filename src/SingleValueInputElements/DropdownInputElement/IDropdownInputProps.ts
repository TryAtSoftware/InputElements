import { IBaseInputElementProps } from '../IBaseInputElementProps';
import { IDropdownInputOption } from './IDropdownInputOption';

export interface IDropdownInputProps extends IBaseInputElementProps {
    options?: IDropdownInputOption[];

    /**
     * The default option for the dropdown.
     */
    defaultOption?: IDropdownInputOption;
}
