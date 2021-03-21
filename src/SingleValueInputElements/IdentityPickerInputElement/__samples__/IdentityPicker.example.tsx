import * as React from 'react';
import {
    IdentityPicker,
    IIdentityPickerProps,
    IValueInputElement,
    SingleValueInputElement,
    UpdateCallback
} from '@try-at-software/input-elements';
import { IPersonaProps, PrimaryButton } from 'office-ui-fabric-react';
import { people } from './ExampleData';

interface IIdentityPickerSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class IdentityPickerSample extends React.Component<unknown, IIdentityPickerSampleState> {
    private _identityPicker: IValueInputElement<IPersonaProps[]>;

    public constructor(props: unknown) {
        super(props);

        this._identityPicker = new SingleValueInputElement<IPersonaProps[], IIdentityPickerProps>(
            { isRequired: true },
            IdentityPicker,
            {
                getTextFromItem: this._getTextFromItem,
                onEmptyResolveSuggestions: this._returnMostRecentlyUsed,
                onResolveSuggestions: this._onFilterChanged,
                placeholder: 'Basic identity picker input (required, without error handling)'
            },
            this.updateForm
        );

        this.state = {
            isValid: this._identityPicker.isValid,
            hasChanges: this._identityPicker.hasChanges
        };
    }

    private updateForm: UpdateCallback = (): void => {
        if (this._identityPicker.isValid === this.state.isValid && this._identityPicker.hasChanges === this.state.hasChanges) return;

        this.setState({
            isValid: this._identityPicker.isValid,
            hasChanges: this._identityPicker.hasChanges
        });
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-identity-picker-input">
                {this._identityPicker.render()}
                <PrimaryButton
                    text="Submit"
                    disabled={!this._identityPicker.isValid}
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

        return personas.filter((item): boolean => item.text === persona.text).length > 0;
    };

    private _getTextFromItem = (item: IPersonaProps): string => {
        return item?.text;
    };
}
