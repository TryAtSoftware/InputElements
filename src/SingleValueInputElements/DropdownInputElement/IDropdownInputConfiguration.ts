import { FormText } from '../../Components';

export interface IDropdownInputStyles {
    automaticHeight?: boolean;
}

export interface IDropdownInputConfiguration {
    consistencyErrorMessage?: FormText;
    styles?: IDropdownInputStyles;
}
