import * as React from 'react';
import { Dropdown, IDropdownOption, MessageBarType } from '@fluentui/react';
import { ErrorRenderer, LabelRenderer } from '../../Components';
import { DropdownHelper } from '../../Utilities';
import { IBaseInputElementProps } from '../IBaseInputElementProps';
import { IDropdownInputProps } from './IDropdownInputProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { IFluentUiDropdownInputProps } from './IFluentUiDropdownInputProps';

export class DropdownInput extends React.Component<
    ISingleValueInputElementProps<string> & IBaseInputElementProps & IDropdownInputProps & IFluentUiDropdownInputProps
> {
    public render(): JSX.Element {
        if (!this.props) return null;

        const normalizedOptions = DropdownHelper.getNormalizedOptions(this.props.defaultOption, this.props.options);
        const DropdownComponent = this.props.dropdownComponent ?? Dropdown;
        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
                <DropdownComponent
                    data-automationid="dropdown-input"
                    options={normalizedOptions}
                    onChange={(_event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void =>
                        !!this.props.onChange && this.props.onChange(option.key as string)
                    }
                    placeholder={this.props.placeholder}
                    // This value should never be `undefined`.
                    defaultSelectedKey={this.props.value || this.props.defaultOption?.key || null}
                    disabled={this.props.isDisabled}
                />
                <ErrorRenderer error={this.props.errorMessage} messageBarType={MessageBarType.error} />
            </>
        );
    }
}
