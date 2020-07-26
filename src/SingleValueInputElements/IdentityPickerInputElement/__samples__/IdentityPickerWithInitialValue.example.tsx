import * as React from 'react';
import {
    ArrayComparator,
    IChangingInputElement,
    IdentityPicker,
    IIdentityPickerProps,
    IValueInputElement,
    SingleValueInputElement,
    UpdateType
} from '@try-at-software/input-elements';
import { Checkbox, IPersonaProps, PrimaryButton } from 'office-ui-fabric-react';
import { people } from './ExampleData';

export default class IdentityPickerWithInitialValueSample extends React.Component {
    private _identityPicker: IValueInputElement<IPersonaProps[]> & IChangingInputElement<IPersonaProps[]>;

    public constructor(props: unknown) {
        super(props);

        this._identityPicker = new SingleValueInputElement<IPersonaProps[], IIdentityPickerProps>(
            { isRequired: true, comparator: new ArrayComparator<IPersonaProps>() },
            IdentityPicker,
            {
                getTextFromItem: this._getTextFromItem,
                onEmptyResolveSuggestions: this._returnMostRecentlyUsed,
                onResolveSuggestions: this._onFilterChanged,
                placeholder: 'Basic identity picker input with initial value (required, without error handling)'
            },
            this._updateForm
        );

        this._identityPicker.setInitialValue([people[0], people[7], people[16]]);
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group identity-picker-with-initial-value-input">
                {this._identityPicker.render()}
                <Checkbox label="Is valid" checked={this._identityPicker.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this._identityPicker.hasChanges} disabled={true} />
                <PrimaryButton
                    text="Submit"
                    disabled={!this._identityPicker.isValid || !this._identityPicker.hasChanges}
                    onClick={(): void => console.log(this._identityPicker.value)}
                />
            </div>
        );
    }

    private _returnMostRecentlyUsed = (currentPersonas: IPersonaProps[]): Promise<IPersonaProps[]> => {
        return Promise.resolve(this._removeDuplicates(people, currentPersonas));
    };

    private _onFilterChanged = (filterText: string, currentPersonas: IPersonaProps[]): Promise<IPersonaProps[]> => {
        let personas: IPersonaProps[] = [];

        if (filterText) {
            let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

            filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
            personas = filteredPersonas;
        }

        return Promise.resolve(personas);
    };

    private _filterPersonasByText = (filterText: string): IPersonaProps[] => {
        return people.filter((item): boolean => item.text.toLowerCase().indexOf(filterText.toLowerCase()) === 0);
    };

    private _removeDuplicates = (personas: IPersonaProps[], possibleDupes: IPersonaProps[]): IPersonaProps[] => {
        return personas.filter((persona): boolean => !this._listContainsPersona(persona, possibleDupes));
    };

    private _listContainsPersona = (persona: IPersonaProps, personas: IPersonaProps[]): boolean => {
        if (!personas || !personas.length || personas.length === 0) return false;

        return personas.filter((item) => item.text === persona.text).length > 0;
    };

    private _getTextFromItem = (item: IPersonaProps): string => {
        return item?.text;
    };

    private _updateForm = (updateType: UpdateType): void => {
        if (updateType === UpdateType.Initial) return;

        this.forceUpdate();
    };
}
