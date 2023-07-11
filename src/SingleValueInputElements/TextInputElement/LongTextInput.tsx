import { TextField } from '@fluentui/react';
import * as React from 'react';
import { materializeErrorMessage } from '../../Components';
import { LabelRenderer } from '../../Components';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IDynamicProps } from '../IDynamicProps';
import { IOperativeProps } from '../IOperativeProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { ILongTextInputProps } from './ILongTextInputProps';

export class LongTextInput extends React.Component<
    ISingleValueInputElementProps<string> & IOperativeProps<ILongTextInputProps> & IDynamicProps<IBaseInputElementDynamicProps>
> {
    public render(): JSX.Element {
        if (!this.props) return null;

        const { dynamicProps, operativeProps } = this.props;
        const { isDisabled } = dynamicProps;
        const { autoAdjustHeight, autoFocus, contentType, placeholder, resizable } = operativeProps;

        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
                <TextField
                    data-automationid="long-text-input"
                    value={this.props.value || ''}
                    onChange={this.handleChange}
                    errorMessage={materializeErrorMessage(this.props.errorMessage)}
                    type={contentType}
                    placeholder={placeholder}
                    autoAdjustHeight={autoAdjustHeight}
                    resizable={resizable}
                    disabled={isDisabled}
                    autoFocus={autoFocus}
                    validateOnFocusOut
                    multiline
                />
            </>
        );
    }

    private handleChange = (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string): void => {
        const { onChange } = this.props;
        onChange?.(newValue);
    };
}
