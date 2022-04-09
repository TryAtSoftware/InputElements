import { TextField } from '@fluentui/react';
import * as React from 'react';
import { materializeErrorMessage } from '../../Components';
import { LabelRenderer } from '../../Components';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IDynamicProps } from '../IDynamicProps';
import { IOperativeProps } from '../IOperativeProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { ITextInputProps } from './ITextInputProps';

export interface ILongTextInputState {
    isMultiline: boolean;
}

export class LongTextInput extends React.Component<
    ISingleValueInputElementProps<string> & IOperativeProps<ITextInputProps> & IDynamicProps<IBaseInputElementDynamicProps>,
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

        const { dynamicProps, operativeProps } = this.props;
        const { isDisabled } = dynamicProps;
        const { autoFocus, contentType, placeholder } = operativeProps;

        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
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
                    errorMessage={materializeErrorMessage(this.props.errorMessage)}
                    type={contentType}
                    placeholder={placeholder}
                    multiline={this.state.isMultiline}
                    autoAdjustHeight={this.state.isMultiline}
                    validateOnFocusOut={true}
                    disabled={isDisabled}
                    autoFocus={autoFocus}
                />
            </>
        );
    }
}
