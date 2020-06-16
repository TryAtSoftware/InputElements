import * as React from 'react';
import ISingleValueInputElementProps from '../ISingleValueInputElementProps';
import ITextInputProps from './ITextInputProps';
import { TextField } from 'office-ui-fabric-react';

export default class TextInput extends React.Component<ISingleValueInputElementProps<string> & ITextInputProps> {
    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <TextField
                label={this.props.label}
                value={this.props.value || ''}
                onChange={(_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void =>
                    this.props.onChange(newValue)
                }
                errorMessage={this.props.errorMessage}
                required={this.props.isRequired}
                type={this.props.contentType}
                placeholder={this.props.placeholder}
                validateOnFocusOut={true}
            />
        );
    }
}
