import {
    INumberInputProps,
    IValueInputElement,
    NumberInput,
    SingleValueInputElement,
    UpdateCallback,
    ZeroIsValidComparator
} from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';
import * as React from 'react';

interface IDecimalNumberInputSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class DecimalNumberInputSample extends React.Component<unknown, IDecimalNumberInputSampleState> {
    private _numberInput: IValueInputElement<number>;

    public constructor(props: unknown) {
        super(props);

        this._numberInput = new SingleValueInputElement<number, INumberInputProps>(
            {
                isRequired: true,
                renderRequiredIndicator: true,
                label: 'Decimal numeric input (required, without error handling)',
                comparator: new ZeroIsValidComparator()
            },
            NumberInput,
            {
                placeholder: 'When you enter some number, the button will become enabled.',
                handleDecimalValues: true
            },
            this.updateForm
        );

        this.state = {
            isValid: this._numberInput.isValid,
            hasChanges: this._numberInput.hasChanges
        };
    }

    private updateForm: UpdateCallback = (): void => {
        if (this._numberInput.isValid === this.state.isValid && this._numberInput.hasChanges === this.state.hasChanges) return;

        this.setState({
            isValid: this._numberInput.isValid,
            hasChanges: this._numberInput.hasChanges
        });
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group decimal-numeric-input">
                {this._numberInput.render()}
                <PrimaryButton
                    text="Submit"
                    disabled={!this.state.isValid || !this.state.hasChanges}
                    onClick={(): void => console.log(this._numberInput.value)}
                />
            </div>
        );
    }
}
