import * as React from 'react';
import { Dropdown, IDropdownOption, Label } from 'office-ui-fabric-react';
import { DropdownHelper } from '../../Utilities';
import { IBaseInputElementProps } from '../IBaseInputElementProps';
import { IDropdownInputProps } from './IDropdownInputProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';

export class DropdownInput extends React.Component<ISingleValueInputElementProps<string> & IBaseInputElementProps & IDropdownInputProps> {
    public render(): JSX.Element {
        if (!this.props) return null;

        const normalizedOptions = DropdownHelper.getNormalizedOptions(this.props.defaultOption, this.props.options);
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
}
