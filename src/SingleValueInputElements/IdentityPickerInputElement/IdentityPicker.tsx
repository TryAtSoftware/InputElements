import { IPersonaProps, MessageBarType, NormalPeoplePicker } from '@fluentui/react';
import * as React from 'react';
import { ErrorRenderer, LabelRenderer } from '../../Components';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IDynamicProps } from '../IDynamicProps';
import { IOperativeProps } from '../IOperativeProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { IIdentityPickerProps } from './IIdentityPickerProps';

export class IdentityPicker<TIdentity extends IPersonaProps = IPersonaProps> extends React.Component<
    ISingleValueInputElementProps<TIdentity[]> &
        IOperativeProps<IIdentityPickerProps<TIdentity>> &
        IDynamicProps<IBaseInputElementDynamicProps>
> {
    public render(): JSX.Element {
        if (!this.props) return null;
        const { dynamicProps, operativeProps } = this.props;

        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
                <div data-automationid="identity-picker">
                    <NormalPeoplePicker
                        onResolveSuggestions={operativeProps.onResolveSuggestions}
                        onEmptyResolveSuggestions={operativeProps.onEmptyResolveSuggestions}
                        getTextFromItem={operativeProps.getTextFromItem}
                        pickerSuggestionsProps={operativeProps.suggestionProps}
                        onRemoveSuggestion={operativeProps.onRemoveSuggestion}
                        onInputChange={operativeProps.onInputChange}
                        resolveDelay={operativeProps.resolveDelay}
                        itemLimit={operativeProps.itemLimit}
                        disabled={dynamicProps.isDisabled}
                        defaultSelectedItems={this.props.value}
                        inputProps={{
                            required: this.props.renderRequiredIndicator,
                            placeholder: !!this.props.value && this.props.value.length > 0 ? '' : operativeProps.placeholder
                        }}
                        onChange={(items?: TIdentity[]): void => {
                            this.props.onChange(items);
                        }}
                    />
                </div>
                <ErrorRenderer error={this.props.errorMessage} messageBarType={MessageBarType.warning} />
            </>
        );
    }
}
