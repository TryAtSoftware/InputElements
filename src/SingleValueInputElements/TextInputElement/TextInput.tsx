import { TextField } from '@fluentui/react';
import * as React from 'react';
import { LabelRenderer, materializeErrorMessage } from '../../Components';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IDynamicProps } from '../IDynamicProps';
import { IOperativeProps } from '../IOperativeProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { ITextInputProps } from './ITextInputProps';

export class TextInput extends React.Component<
    ISingleValueInputElementProps<string> & IOperativeProps<ITextInputProps> & IDynamicProps<IBaseInputElementDynamicProps>
> {
    public render(): JSX.Element {
        if (!this.props) return null;

        const { dynamicProps, operativeProps } = this.props;
        const { isDisabled } = dynamicProps;
        const { autoFocus, contentType, placeholder } = operativeProps;

        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
                <TextField
                    data-automationid="text-input"
                    value={this.props.value || ''}
                    onChange={this.handleChange}
                    errorMessage={materializeErrorMessage(this.props.errorMessage)}
                    type={contentType}
                    placeholder={placeholder}
                    validateOnFocusOut={true}
                    disabled={isDisabled}
                    autoFocus={autoFocus}
                />
            </>
        );
    }

    private handleChange = (_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        const { onChange } = this.props;
        onChange?.(newValue);
    };
}
