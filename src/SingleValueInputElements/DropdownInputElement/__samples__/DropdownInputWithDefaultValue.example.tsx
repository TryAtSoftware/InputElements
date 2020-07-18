import * as React from 'react';
import { IDropdownOption, PrimaryButton } from 'office-ui-fabric-react';
import DropdownInput from '../DropdownInput';
import IDropdownInputProps from '../IDropdownInputProps';
import { IValueInputElement } from '../../../IValueInputElement';
import SingleValueInputElement from '../../SingleValueInputElement';

export default class DropdownInputWithDefaultValueSample extends React.Component {
    private _dropdownInput: IValueInputElement<string>;

    public constructor(props: unknown) {
        super(props);

        const options: Array<string> = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        const defaultKey = 'default';
        this._dropdownInput = new SingleValueInputElement<string, IDropdownInputProps>(
            {
                isRequired: true,
                label: 'Dropdown input with default selected value (required, without error handling)'
            },
            DropdownInput,
            {
                options: options.map(
                    (o): IDropdownOption => {
                        return {
                            key: o,
                            text: o
                        };
                    }
                ),
                defaultOption: {
                    key: defaultKey,
                    text: 'Please select a given option'
                }
            },
            (): void => this.forceUpdate(),
            (selectedKey: string): string => {
                if (selectedKey === defaultKey) return 'You should select any other value but the default one';

                return '';
            }
        );
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group dropdown-input-with-default-value">
                {this._dropdownInput.render()}
                <PrimaryButton
                    text="Submit"
                    disabled={!this._dropdownInput.isValid}
                    onClick={(): void => console.log(this._dropdownInput.value)}
                />
            </div>
        );
    }
}
