import { IDropdownInputOption } from './IDropdownInputOption';

export interface IDropdownInputProps {
    options?: IDropdownInputOption[];

    /**
     * The default option for the dropdown.
     */
    defaultOption?: IDropdownInputOption;
    placeholder?: string;
    isDisabled?: boolean;
}
