import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import IDropdownInputProps from './IDropdownInputProps';
import ISingleValueInputElementProps from '../ISingleValueInputElementProps';

export default class DropdownInput extends React.Component<
    ISingleValueInputElementProps<string> & IDropdownInputProps
> {
    public render(): JSX.Element {
        const normalizedOptions = this.getNormalizedOptions();

        return (
            <Dropdown
                label={this.props?.label}
                options={normalizedOptions}
                onChange={(_event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void =>
                    !!this.props?.onChange && this.props.onChange(option.key as string)
                }
                errorMessage={this.props?.errorMessage}
                required={!!this.props?.isRequired}
                placeholder={this.props?.placeholder}
                // This value should never be `undefined`.
                defaultSelectedKey={this.props?.value || this.props?.defaultOption?.key || null}
            />
        );
    }

    private getNormalizedOptions(): Array<IDropdownOption> {
        const options = [];

        if (!!this.props?.defaultOption) {
            const defaultOption: IDropdownOption = {
                ...this.props.defaultOption,
                selected: true
            };
            options.push(defaultOption);
        }

        if (!!this.props?.options)
            this.props.options.forEach((o): void => {
                if (!o) return;

                const newOption: IDropdownOption = {
                    ...o,
                    selected: false
                };
                options.push(newOption);
            });

        return options;
    }
}
