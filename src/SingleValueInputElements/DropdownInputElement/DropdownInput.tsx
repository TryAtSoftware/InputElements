import * as React from 'react';
import { Dropdown, IDropdownOption, Label } from 'office-ui-fabric-react';
import { IBaseInputElementProps } from '../IBaseInputElementProps';
import { IDropdownInputProps } from './IDropdownInputProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';

export class DropdownInput extends React.Component<ISingleValueInputElementProps<string> & IBaseInputElementProps & IDropdownInputProps> {
    public render(): JSX.Element {
        const normalizedOptions = this.getNormalizedOptions();

        return (
            <>
                {!!this.props?.label && <Label required={!!this.props.renderRequiredIndicator}>{this.props.label}</Label>}
                <Dropdown
                    options={normalizedOptions}
                    onChange={(_event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void =>
                        !!this.props?.onChange && this.props.onChange(option.key as string)
                    }
                    errorMessage={this.props?.errorMessage}
                    placeholder={this.props?.placeholder}
                    // This value should never be `undefined`.
                    defaultSelectedKey={this.props?.value || this.props?.defaultOption?.key || null}
                    disabled={this.props?.isDisabled}
                />
            </>
        );
    }

    private getNormalizedOptions(): IDropdownOption[] {
        const options = [];

        if (!!this.props?.defaultOption) {
            const defaultOption: IDropdownOption = {
                ...this.props.defaultOption,
                selected: true
            };
            options.push(defaultOption);
        }

        if (!this.props?.options || !Array.isArray(this.props.options)) return options;

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
