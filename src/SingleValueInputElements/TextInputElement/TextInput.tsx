import * as React from 'react';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { ITextInputProps } from './ITextInputProps';
import { Label, TextField } from 'office-ui-fabric-react';

export class TextInput extends React.Component<ISingleValueInputElementProps<string> & ITextInputProps> {
    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <>
                {!!this.props?.label && <Label required={!!this.props.renderRequiredIndicator}>{this.props.label}</Label>}
                <TextField
                    value={this.props.value || ''}
                    onChange={(_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
                        this.props.onChange(newValue);
                    }}
                    errorMessage={this.props.errorMessage}
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
