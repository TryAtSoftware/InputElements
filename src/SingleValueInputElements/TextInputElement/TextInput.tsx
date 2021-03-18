import * as React from 'react';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { ITextInputProps } from './ITextInputProps';
import { TextField } from 'office-ui-fabric-react';

interface ITextInputState {
    value: string;
}

export class TextInput extends React.Component<ISingleValueInputElementProps<string> & ITextInputProps, ITextInputState> {
    public state: ITextInputState = {
        value: this.props.value
    };

    public update(newValue: string): void {
        this.setState({ value: newValue });
    }

    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <TextField
                label={this.props.label}
                value={this.state.value || ''}
                onChange={(_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
                    this.props.onChange(newValue);
                }}
                errorMessage={this.props.errorMessage}
                required={this.props.isRequired}
                type={this.props.contentType}
                placeholder={this.props.placeholder}
                validateOnFocusOut={true}
                disabled={this.props.isDisabled}
                autoFocus={this.props.autoFocus}
            />
        );
    }
}
