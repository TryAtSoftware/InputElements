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
                defaultSelectedKey={this.props?.value || this.props?.defaultOption?.key}
            />
        );
    }

    private getNormalizedOptions(): Array<IDropdownOption> {
        const options = [];

        if (!!this.props?.defaultOption) {
            this.props.defaultOption.selected = true;
            options.push(this.props.defaultOption);
        }

        if (!!this.props?.options)
            this.props.options.forEach((o): void => {
                if (!o) return;

                o.selected = false;
                options.push(o);
            });

        return options;
    }
}
