import { IBasePickerSuggestionsProps, IPersonaProps } from '@fluentui/react';
import { IBaseInputElementProps } from '../IBaseInputElementProps';

export interface IIdentityPickerProps<TIdentity extends IPersonaProps = IPersonaProps> extends IBaseInputElementProps {
    onResolveSuggestions: (query: string, selectedItems?: TIdentity[]) => Promise<TIdentity[]>;
    getTextFromItem?: (item: TIdentity, currentValue?: string) => string;
    onEmptyResolveSuggestions?: (currentPersonas?: TIdentity[]) => Promise<TIdentity[]>;
    suggestionProps?: IBasePickerSuggestionsProps;
    onRemoveSuggestion?: (item: TIdentity) => void;
    onInputChange?: (input: string) => string;
    resolveDelay?: number;
    itemLimit?: number;
}
