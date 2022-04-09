import { Dropdown, IDropdownOption, MessageBarType } from '@fluentui/react';
import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { ErrorRenderer, FormText, LabelRenderer } from '../../Components';
import { DropdownHelper } from '../../Utilities';
import { IBaseInputElementProps } from '../IBaseInputElementProps';
import { IDynamicProps } from '../IDynamicProps';
import { IOperativeProps } from '../IOperativeProps';
import { IInvalidationOptions, ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { IDropdownInputProps } from './IDropdownInputProps';
import { IFluentUiDropdownInputProps } from './IFluentUiDropdownInputProps';

interface ISingleValueDropdownInputProps
    extends ISingleValueInputElementProps<string>,
        IOperativeProps<IBaseInputElementProps>,
        IDynamicProps<IDropdownInputProps & IFluentUiDropdownInputProps> {
    consistencyErrorMessage?: FormText;
}

const ConsistencyErrorMessage = 'The value is not present within the specified options.';

const DropdownInputComponent = (props: ISingleValueDropdownInputProps): JSX.Element => {
    const { dynamicProps, operativeProps } = props;
    const normalizedOptions = useMemo(
        () => DropdownHelper.getNormalizedOptions(dynamicProps.defaultOption, dynamicProps.options),
        [dynamicProps.defaultOption, dynamicProps.options]
    );

    useEffect(() => {
        if (!props.value || normalizedOptions.some((o) => o.key === props.value)) return;

        const invalidationOptions: IInvalidationOptions = { errorMessage: props.consistencyErrorMessage || ConsistencyErrorMessage };
        props.invalidateInput(invalidationOptions);
    }, [props.value, normalizedOptions, props.consistencyErrorMessage, props.invalidateInput]);
    const DropdownComponent = useMemo(() => dynamicProps.dropdownComponent ?? Dropdown, [dynamicProps.dropdownComponent]);

    return (
        <>
            <LabelRenderer label={props.label} required={!!props.renderRequiredIndicator} />
            <DropdownComponent
                data-automationid="dropdown-input"
                options={normalizedOptions}
                onChange={(_event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void =>
                    !!props.onChange && props.onChange(option.key as string)
                }
                placeholder={operativeProps.placeholder}
                // This value should never be `undefined`.
                defaultSelectedKey={props.value || dynamicProps.defaultOption?.key || null}
                disabled={dynamicProps.isDisabled}
            />
            <ErrorRenderer error={props.errorMessage} messageBarType={MessageBarType.error} />
        </>
    );
};

export const DropdownInput = React.memo(DropdownInputComponent);
