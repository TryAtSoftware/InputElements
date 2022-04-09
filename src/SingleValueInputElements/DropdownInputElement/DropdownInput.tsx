import { Dropdown, IDropdownOption, MessageBarType } from '@fluentui/react';
import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { ErrorRenderer, FormText, LabelRenderer } from '../../Components';
import { DropdownHelper } from '../../Utilities';
import { IBaseInputElementProps } from '../IBaseInputElementProps';
import { IInvalidationOptions, ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { IDropdownInputProps } from './IDropdownInputProps';
import { IFluentUiDropdownInputProps } from './IFluentUiDropdownInputProps';

interface ISingleValueDropdownInputProps
    extends ISingleValueInputElementProps<string>,
        IBaseInputElementProps,
        IDropdownInputProps,
        IFluentUiDropdownInputProps {
    consistencyErrorMessage?: FormText;
}

const ConsistencyErrorMessage = 'The value is not present within the specified options.';

const DropdownInputComponent = (props: ISingleValueDropdownInputProps): JSX.Element => {
    const normalizedOptions = useMemo(
        () => DropdownHelper.getNormalizedOptions(props.defaultOption, props.options),
        [props.defaultOption, props.options]
    );

    useEffect(() => {
        if (!props.value || normalizedOptions.some((o) => o.key === props.value)) return;

        const invalidationOptions: IInvalidationOptions = { errorMessage: props.consistencyErrorMessage || ConsistencyErrorMessage };
        props.invalidateInput(invalidationOptions);
    }, [props.value, normalizedOptions, props.consistencyErrorMessage, props.invalidateInput]);
    const DropdownComponent = useMemo(() => props.dropdownComponent ?? Dropdown, [props.dropdownComponent]);

    return (
        <>
            <LabelRenderer label={props.label} required={!!props.renderRequiredIndicator} />
            <DropdownComponent
                data-automationid="dropdown-input"
                options={normalizedOptions}
                onChange={(_event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void =>
                    !!props.onChange && props.onChange(option.key as string)
                }
                placeholder={props.placeholder}
                // This value should never be `undefined`.
                defaultSelectedKey={props.value || props.defaultOption?.key || null}
                disabled={props.isDisabled}
            />
            <ErrorRenderer error={props.errorMessage} messageBarType={MessageBarType.error} />
        </>
    );
};

export const DropdownInput = React.memo(DropdownInputComponent);
