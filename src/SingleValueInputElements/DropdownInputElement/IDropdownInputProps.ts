import IDropdownInputOption from './IDropdownInputOption';

export default interface IDropdownInputProps {
    options?: Array<IDropdownInputOption>;
    placeholder?: string;

    /**
     * The default option for the dropdown.
     */
    defaultOption?: IDropdownInputOption;
}
