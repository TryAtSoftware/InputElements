import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { DropdownHelper } from '../../Utilities';
import { IBaseInputElementProps } from '../IBaseInputElementProps';
import { IDropdownInputProps } from './IDropdownInputProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';

export class MultiValueDropdownInput extends React.Component<
    ISingleValueInputElementProps<string[]> & IBaseInputElementProps & IDropdownInputProps
> {
    public render(): JSX.Element {
        const normalizedOptions = DropdownHelper.getNormalizedOptions(this.props?.defaultOption, this.props?.options);

        return (
            <Dropdown
                label={this.props?.label}
                options={normalizedOptions}
                onChange={(_event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
                    const optionKey = option?.key?.toString();
                    if (!optionKey) return;

                    // We have to re-iterate the passed collection of values here in order to detect changes between the initial and the current values.
                    let currentValues: string[] = [];
                    if (this.props?.value) currentValues.push(...this.props.value);

                    // If the current option is selected, add it to the list.
                    // Else, remove it.
                    if (option.selected) currentValues.push(optionKey);
                    else currentValues = currentValues.filter((x): boolean => x !== optionKey);

                    !!this.props?.onChange && this.props.onChange(currentValues);
                }}
                errorMessage={this.props?.errorMessage}
                required={!!this.props?.renderRequiredIndicator}
                placeholder={this.props?.placeholder}
                // This value should never be `undefined`.
                defaultSelectedKeys={this.props?.value || [this.props?.defaultOption?.key] || null}
                disabled={this.props?.isDisabled}
                multiSelect
            />
        );
    }
}
