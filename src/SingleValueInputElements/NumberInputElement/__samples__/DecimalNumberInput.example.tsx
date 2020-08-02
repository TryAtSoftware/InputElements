import * as React from 'react';
import { INumberInputProps, IValueInputElement, NumberInput, SingleValueInputElement } from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';

export default class DecimalNumberInputSample extends React.Component {
    private _numberInput: IValueInputElement<number>;

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._numberInput = new SingleValueInputElement<number, INumberInputProps>(
            { isRequired: true, label: 'Decimal numeric input (required, without error handling)' },
            NumberInput,
            {
                placeholder: 'When you enter some number, the button will become enabled.',
                handleDecimalValues: true
            },
            (): void => this.forceUpdate()
        );
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group decimal-numeric-input">
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
