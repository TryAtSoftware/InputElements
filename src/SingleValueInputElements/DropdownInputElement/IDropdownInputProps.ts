import { IDropdownOption } from 'office-ui-fabric-react';

export default interface IDropdownInputProps {
    options?: Array<IDropdownOption>;
    placeholder?: string;

    /**
     * The default option for the dropdown.
     */
    // TODO: This should be of more generic and reusable type.
    defaultOption?: IDropdownOption;
}
