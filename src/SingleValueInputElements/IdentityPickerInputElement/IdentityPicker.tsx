import { IPersonaProps, MessageBarType, NormalPeoplePicker } from '@fluentui/react';
import * as React from 'react';
import { ErrorRenderer, LabelRenderer } from '../../Components';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';
import { IIdentityPickerProps } from './IIdentityPickerProps';

export class IdentityPicker<TIdentity extends IPersonaProps = IPersonaProps> extends React.Component<
    ISingleValueInputElementProps<TIdentity[]> & IIdentityPickerProps<TIdentity> & IBaseInputElementDynamicProps
> {
    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <>
                <LabelRenderer label={this.props.label} required={!!this.props.renderRequiredIndicator} />
                <div data-automationid="identity-picker">
                    <NormalPeoplePicker
                        onResolveSuggestions={this.props.onResolveSuggestions}
                        onEmptyResolveSuggestions={this.props.onEmptyResolveSuggestions}
                        getTextFromItem={this.props.getTextFromItem}
                        pickerSuggestionsProps={this.props.suggestionProps}
                        onRemoveSuggestion={this.props.onRemoveSuggestion}
                        onInputChange={this.props.onInputChange}
                        resolveDelay={this.props.resolveDelay}
                        itemLimit={this.props.itemLimit}
                        disabled={this.props.isDisabled}
                        defaultSelectedItems={this.props.value}
                        inputProps={{
                            required: this.props.renderRequiredIndicator,
                            placeholder: !!this.props.value && this.props.value.length > 0 ? '' : this.props.placeholder
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
