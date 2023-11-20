import * as React from 'react';
import {
    FormText,
    INumberInputProps,
    IValueInputElement,
    NumberInput,
    SingleValueInputElement,
    UpdateCallback,
    ZeroIsValidComparator
} from '@try-at-software/input-elements';
import { Checkbox, PrimaryButton } from '@fluentui/react';

interface INonRequiredNumberInputSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class NonRequiredNumberInputSample extends React.Component<unknown, INonRequiredNumberInputSampleState> {
    private _numberInput: IValueInputElement<number>;

    public constructor(props: unknown) {
        super(props);

        this._numberInput = new SingleValueInputElement<number, INumberInputProps>(
            {
                isRequired: false,
                renderRequiredIndicator: true,
                label: 'Basic numeric input (not required, with error handling)',
                renderErrors: true,
                comparator: new ZeroIsValidComparator()
            },
            NumberInput,
            {
                placeholder: 'When you enter some number, the button will become enabled.',
                min: 0,
                max: 100,
                getMinErrorMessage: (min: number, max: number | undefined): FormText => `The value must be between ${min} and ${max}`,
                getMaxErrorMessage: (min: number | undefined, max: number): FormText => `The value must be between ${min} and ${max}`
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
            <div className="sample-group basic-numeric-input">
                {this._numberInput.render()}
                <PrimaryButton
                    text="Submit"
                    disabled={!this.state.isValid || !this.state.hasChanges}
                    onClick={(): void => console.log(this._numberInput.value)}
                />
                <Checkbox label="Is valid" checked={this.state.isValid} disabled />
                <Checkbox label="Has changes" checked={this.state.hasChanges} disabled />
            </div>
        );
    }
}
