import * as React from 'react';
import { ISingleValueInputElement, ITextInputProps, ResetValueOptions, TextInput, UpdateCallback } from '@try-at-software/input-elements';
import { Checkbox, PrimaryButton, Stack } from '@fluentui/react';
import { getFormState, prepareInputElement } from '../../Utilities';
import { IInputElement } from '../../IInputElement';

interface IResetSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class ResetSample extends React.Component<unknown, IResetSampleState> {
    private _inputElementWithInitialValue: ISingleValueInputElement<string, ITextInputProps>;
    private _inputElementWithoutInitialValue: ISingleValueInputElement<string, ITextInputProps>;

    private _allInputs: IInputElement[];

    public constructor(props: unknown) {
        super(props);

        this._inputElementWithInitialValue = prepareInputElement<string>(
            { isRequired: true, label: 'Required input element with initial value' },
            this.updateForm
        ).materialize(TextInput, { placeholder: 'Examine the reset behavior of the input element.' });
        this._inputElementWithInitialValue.setInitialValue('Initial value');

        this._inputElementWithoutInitialValue = prepareInputElement<string>(
            { isRequired: true, label: 'Required input element without initial value' },
            this.updateForm
        ).materialize(TextInput, { placeholder: 'Examine the reset behavior of the input element.' });

        this._allInputs = [this._inputElementWithInitialValue, this._inputElementWithoutInitialValue];

        const initialFormState = getFormState(this._allInputs);
        this.state = { isValid: initialFormState.isValid, hasChanges: initialFormState.hasChanges };
    }

    private updateForm: UpdateCallback = (): void => {
        const formState = getFormState(this._allInputs);
        if (formState.isValid === this.state.isValid && formState.hasChanges === this.state.hasChanges) return;

        this.setState({
            isValid: formState.isValid,
            hasChanges: formState.hasChanges
        });
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group reset">
                {this._inputElementWithInitialValue.render()}
                {this._inputElementWithoutInitialValue.render()}

                <Checkbox label="Is valid" checked={this.state.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this.state.hasChanges} disabled={true} />

                <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <PrimaryButton text="Reset" onClick={this.resetInput} />
                    <PrimaryButton text="Reset (hard)" onClick={this.hardResetInput} />
                    <PrimaryButton text="Submit" onClick={this.submit} />
                </Stack>
            </div>
        );
    }

    private resetInput = (): void => {
        this._inputElementWithInitialValue.resetValue();
        this._inputElementWithoutInitialValue.resetValue();
    };

    private hardResetInput = (): void => {
        const options: ResetValueOptions = { avoidFallbackToInitialValue: true };
        this._inputElementWithInitialValue.resetValue(options);
        this._inputElementWithoutInitialValue.resetValue(options);
    };

    private submit = (): void => {
        console.log(this._inputElementWithInitialValue.value);
        console.log(this._inputElementWithoutInitialValue.value);
    };
}
