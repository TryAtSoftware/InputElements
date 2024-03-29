export interface IDropdownInputOption {
    key: string;
    text: string;
    type?: DropdownOptionType;
    disabled?: boolean;
}

export enum DropdownOptionType {
    Normal = 0,
    Divider = 1,
    Header = 2
}
