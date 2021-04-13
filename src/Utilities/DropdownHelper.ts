import { IDropdownOption, SelectableOptionMenuItemType } from 'office-ui-fabric-react';
import { DropdownOptionType, IDropdownInputOption } from '../SingleValueInputElements';

export class DropdownHelper {
    public static getNormalizedOptions(defaultOption: IDropdownInputOption, allOptions: IDropdownInputOption[]): IDropdownOption[] {
        const options = [];

        if (!!defaultOption) {
            const predefinedDefaultOption: IDropdownOption = {
                ...DropdownHelper.toNormalizedDropdownOption(defaultOption),
                selected: true
            };
            options.push(predefinedDefaultOption);
        }

        if (!!allOptions)
            allOptions.forEach((o): void => {
                if (!o) return;

                const newOption = this.toNormalizedDropdownOption(o);
                options.push(newOption);
            });

        return options;
    }

    public static toNormalizedDropdownOption = (inputOption: IDropdownInputOption): IDropdownOption => {
        if (!inputOption) return null;

        let itemType: SelectableOptionMenuItemType;
        if (inputOption.type !== undefined) {
            switch (inputOption.type) {
                case DropdownOptionType.Normal:
                    itemType = SelectableOptionMenuItemType.Normal;
                    break;
                case DropdownOptionType.Divider:
                    itemType = SelectableOptionMenuItemType.Divider;
                    break;
                case DropdownOptionType.Header:
                    itemType = SelectableOptionMenuItemType.Header;
                    break;
            }
        }

        return {
            text: inputOption.text,
            key: inputOption.key,
            itemType: itemType
        };
    };

    public static mapToDropdownOptions(values: string[]): IDropdownInputOption[] {
        if (!values || !Array.isArray(values)) return [];

        return values
            .filter((x): boolean => !!x)
            .map(
                (o): IDropdownInputOption => {
                    return {
                        key: o,
                        text: o
                    };
                }
            );
    }
}
