import * as React from 'react';
import {
    DropdownInput,
    IDropdownInputOption,
    IDropdownInputProps,
    IValueInputElement,
    SingleValueInputElement
} from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';

export default class DropdownInputWithDefaultValueSample extends React.Component {
    private _dropdownInput: IValueInputElement<string>;

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
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
                    (o): IDropdownInputOption => {
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
