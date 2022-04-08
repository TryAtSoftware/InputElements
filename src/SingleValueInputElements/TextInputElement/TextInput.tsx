import { TextField } from '@fluentui/react';
import * as React from 'react';
import { LabelRenderer, materializeErrorMessage } from '../../Components';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { ITextInputProps } from './ITextInputProps';

export class TextInput extends React.Component<ISingleValueInputElementProps<string> & ITextInputProps & IBaseInputElementDynamicProps> {
    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
                <TextField
                    data-automationid="text-input"
                    value={this.props.value || ''}
                    onChange={(_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
                        this.props.onChange(newValue);
                    }}
                    errorMessage={materializeErrorMessage(this.props.errorMessage)}
                    type={this.props.contentType}
                    placeholder={this.props.placeholder}
                    validateOnFocusOut={true}
                    disabled={this.props.isDisabled}
                    autoFocus={this.props.autoFocus}
                />
            </>
        );
    }
}
