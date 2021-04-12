import { IBasePickerSuggestionsProps, IPersonaProps } from 'office-ui-fabric-react';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IBaseInputElementProps } from '../IBaseInputElementProps';

export interface IIdentityPickerProps<TIdentity extends IPersonaProps = IPersonaProps>
    extends IBaseInputElementProps,
        IBaseInputElementDynamicProps {
    onResolveSuggestions: (query: string, selectedItems?: TIdentity[]) => Promise<TIdentity[]>;
    getTextFromItem?: (item: TIdentity, currentValue?: string) => string;
    onEmptyResolveSuggestions?: (currentPersonas?: TIdentity[]) => Promise<TIdentity[]>;
    suggestionProps?: IBasePickerSuggestionsProps;
    onRemoveSuggestion?: (item: TIdentity) => void;
    onInputChange?: (input: string) => string;
    resolveDelay?: number;
    itemLimit?: number;
}
