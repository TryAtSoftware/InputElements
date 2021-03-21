import * as React from 'react';
import { IChangingInputElement } from '../../../IChangingInputElement';
import { ITextInputProps } from '../ITextInputProps';
import { IValueInputElement } from '../../../IValueInputElement';
import { PrimaryButton } from 'office-ui-fabric-react';
import { SingleValueInputElement } from '../../SingleValueInputElement';
import { restrictMaximumLength, restrictMinimumLength } from '../LengthValidationRules';
import { TextInput } from '../TextInput';

interface ITextInputWithValidationRulesSampleState {
    isValid: boolean;
}

export default class TextInputWithValidationRulesSample extends React.Component<unknown, ITextInputWithValidationRulesSampleState> {
    private _textInput: IValueInputElement<string> & IChangingInputElement<string>;

    public state: ITextInputWithValidationRulesSampleState = {
        isValid: false
    };

    public constructor(props: unknown) {
        super(props);

        this._textInput = new SingleValueInputElement<string, ITextInputProps>(
            {
                isRequired: true,
                label: 'Basic text input with length validation (required, with error handling)',
                renderRequiredIndicator: true,
                renderErrors: true
            },
            TextInput,
            { placeholder: 'When you enter something, the button will become enabled.' },
            (): void => {
                if (this.state.isValid !== this._textInput.isValid) this.setState({ isValid: this._textInput.isValid });
            },
            restrictMinimumLength(5),
            restrictMaximumLength(20)
        );
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-text-input">
                {this._textInput.render()}
                <PrimaryButton text="Submit" disabled={!this._textInput.isValid} onClick={(): void => console.log(this._textInput.value)} />
            </div>
        );
    }
}
