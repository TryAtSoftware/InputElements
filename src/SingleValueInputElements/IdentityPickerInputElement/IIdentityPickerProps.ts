import { IBasePickerSuggestionsProps, IPersonaProps } from 'office-ui-fabric-react';
import { IBaseInputElementDynamicProps } from '../IBaseInputElementDynamicProps';
import { IBaseInputElementProps } from '../IBaseInputElementProps';

export interface IIdentityPickerProps extends IBaseInputElementProps, IBaseInputElementDynamicProps {
    onResolveSuggestions: (query: string, selectedItems?: IPersonaProps[]) => Promise<IPersonaProps[]>;
    getTextFromItem: (item: IPersonaProps, currentValue?: string) => string;
    onEmptyResolveSuggestions?: (currentPersonas?: IPersonaProps[]) => Promise<IPersonaProps[]>;
    suggestionProps?: IBasePickerSuggestionsProps;
    onRemoveSuggestion?: (item: IPersonaProps) => void;
    onInputChange?: (input: string) => string;
    resolveDelay?: number;
    itemLimit?: number;
}
