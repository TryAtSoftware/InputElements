import * as React from 'react';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { ITextInputProps } from './ITextInputProps';
import { Label, TextField } from '@fluentui/react';

export interface ILongTextInputState {
    isMultiline: boolean;
}

export class LongTextInput extends React.Component<
    ISingleValueInputElementProps<string> & ITextInputProps & IBaseInputElementDynamicProps,
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
            <>
                {!!this.props?.label && <Label required={!!this.props.renderRequiredIndicator}>{this.props.label}</Label>}
                <TextField
                    data-automationid="long-text-input"
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
                    type={this.props.contentType}
                    placeholder={this.props.placeholder}
                    multiline={this.state.isMultiline}
                    autoAdjustHeight={this.state.isMultiline}
                    validateOnFocusOut={true}
                    disabled={this.props.isDisabled}
                />
            </>
        );
    }
}
