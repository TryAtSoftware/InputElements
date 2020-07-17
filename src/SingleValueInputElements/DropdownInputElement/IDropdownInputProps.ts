import { IDropdownOption } from 'office-ui-fabric-react';

export default interface IDropdownInputProps {
    options: Array<IDropdownOption>;
    placeholder?: string;

    /**
     * The default option for the dropdown.
     */
    defaultOption?: IDropdownOption;
}
