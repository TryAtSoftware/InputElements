import * as React from 'react';
import DropdownInput from '../DropdownInput';
import IDropdownInputOption from '../IDropdownInputOption';
import IDropdownInputProps from '../IDropdownInputProps';
import { IValueInputElement } from '../../../IValueInputElement';
import { PrimaryButton } from 'office-ui-fabric-react';
import SingleValueInputElement from '../../SingleValueInputElement';

export default class DropdownInputSample extends React.Component {
    private _dropdownInput: IValueInputElement<string>;

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._dropdownInput = new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true, label: 'Basic dropdown input (required, without error handling)' },
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
                placeholder:
                    'When you change the value, the button will become enabled and this message will disappear.'
            },
            (): void => this.forceUpdate()
        );
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-dropdown-input">
                {this._dropdownInput.render()}
                <PrimaryButton
                    text="Submit"
                    disabled={!this._dropdownInput.isValid || !this._dropdownInput.hasChanges}
                    onClick={(): void => console.log(this._dropdownInput.value)}
                />
            </div>
        );
    }
}
