import * as React from 'react';
import { INumberInputProps, IValueInputElement, NumberInput, SingleValueInputElement } from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';

export default class NumberInputSample extends React.Component {
    private _numberInput: IValueInputElement<number>;

    public constructor(props: unknown) {
        super(props);

        this._numberInput = new SingleValueInputElement<number, INumberInputProps>(
            { isRequired: true, renderRequiredIndicator: true, label: 'Basic numeric input (required, without error handling)' },
            NumberInput,
            {
                placeholder: 'When you enter some number, the button will become enabled.'
            },
            (): void => this.forceUpdate()
        );
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-numeric-input">
                {this._numberInput.render()}
                <PrimaryButton
                    text="Submit"
                    disabled={!this._numberInput.isValid || !this._numberInput.hasChanges}
                    onClick={(): void => console.log(this._numberInput.value)}
                />
            </div>
        );
    }
}
