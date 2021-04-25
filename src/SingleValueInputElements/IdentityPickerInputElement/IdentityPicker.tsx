import * as React from 'react';
import { IPersonaProps, Label, MessageBar, MessageBarType, NormalPeoplePicker } from 'office-ui-fabric-react';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IIdentityPickerProps } from './IIdentityPickerProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';

export class IdentityPicker<TIdentity extends IPersonaProps = IPersonaProps> extends React.Component<
    ISingleValueInputElementProps<TIdentity[]> & IIdentityPickerProps<TIdentity> & IBaseInputElementDynamicProps
> {
    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <>
                {this.props.label && <Label required={this.props.renderRequiredIndicator}>{this.props.label}</Label>}
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
                {!!this.props?.errorMessage && <MessageBar messageBarType={MessageBarType.warning}>{this.props.errorMessage}</MessageBar>}
            </>
        );
    }
}
