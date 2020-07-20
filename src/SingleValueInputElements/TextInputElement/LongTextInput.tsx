import * as React from 'react';
import ISingleValueInputElementProps from '../ISingleValueInputElementProps';
import ITextInputProps from './ITextInputProps';
import { TextField } from 'office-ui-fabric-react';

interface ILongTextInputState {
    isMultiline: boolean;
}

export default class LongTextInput extends React.Component<
    ISingleValueInputElementProps<string> & ITextInputProps,
    ILongTextInputState
> {
    /**
     * The number of characters after which the text input is changed to a multiline textbox.
     */
    private multilineThreshold = 70;

    public state: ILongTextInputState = {
        isMultiline: false
    };

    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <TextField
                label={this.props.label}
                underlined={true}
                value={this.props.value || ''}
                onChange={(_event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string): void => {
                    // Dynamically change the 'isMultiline' state property.
                    const isMultiline = newValue.length > this.multilineThreshold;
                    if (this.state.isMultiline !== isMultiline) {
                        this.setState({ isMultiline: isMultiline });
                    }

                    this.props.onChange(newValue);
                }}
                errorMessage={this.props.errorMessage}
                required={this.props.isRequired}
                type={this.props.contentType}
                placeholder={this.props.placeholder}
                multiline={this.state.isMultiline}
                autoAdjustHeight={this.state.isMultiline}
                validateOnFocusOut={true}
                disabled={this.props.isDisabled}
            />
        );
    }
}
