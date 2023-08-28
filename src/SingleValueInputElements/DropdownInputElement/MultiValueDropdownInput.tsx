import { Dropdown, IDropdownOption, MessageBarType } from '@fluentui/react';
import * as React from 'react';
import { ErrorRenderer, LabelRenderer } from '../../Components';
import { DropdownHelper } from '../../Utilities';
import { IBaseInputElementProps } from '../IBaseInputElementProps';
import { IDynamicProps } from '../IDynamicProps';
import { IOperativeProps } from '../IOperativeProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { IMultiValueDropdownInputProps } from "./IMultiValueDropdownInputProps";

export class MultiValueDropdownInput extends React.Component<
    ISingleValueInputElementProps<string[]> & IOperativeProps<IBaseInputElementProps> & IDynamicProps<IMultiValueDropdownInputProps>
> {
    public render(): JSX.Element {
        if (!this.props) return null;

        const { dynamicProps, operativeProps } = this.props;
        const normalizedOptions = DropdownHelper.getNormalizedOptions(dynamicProps.defaultOption, dynamicProps.options);

        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
                <Dropdown
                    data-automationid="multi-value-dropdown-input"
                    options={normalizedOptions}
                    onChange={this.handleChange}
                    required={!!this.props.renderRequiredIndicator}
                    placeholder={operativeProps.placeholder}
                    // This value should never be `undefined`.
                    defaultSelectedKeys={this.props.value || [dynamicProps.defaultOption?.key] || null}
                    disabled={dynamicProps.isDisabled}
                    multiSelect
                    multiSelectDelimiter={dynamicProps.multiSelectDelimiter}
                />
                <ErrorRenderer error={this.props.errorMessage} messageBarType={MessageBarType.error} />
            </>
        );
    }

    private handleChange = (_event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
        const optionKey = option?.key?.toString();
        if (!optionKey) return;

        // We have to re-iterate the passed collection of values here in order to detect changes between the initial and the current values.
        let currentValues: string[] = [];
        if (this.props.value) currentValues.push(...this.props.value);

        // If the current option is selected, add it to the list.
        // Else, remove it.
        if (option.selected) currentValues.push(optionKey);
        else currentValues = currentValues.filter((x): boolean => x !== optionKey);

        this.props.onChange?.(currentValues);
    }
}
