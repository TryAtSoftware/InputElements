import * as React from 'react';
import { IChangingInputElement } from '../../../IChangingInputElement';
import { ITextInputProps } from '../ITextInputProps';
import { IValueInputElement } from '../../../IValueInputElement';
import { PrimaryButton } from 'office-ui-fabric-react';
import { SingleValueInputElement } from '../../SingleValueInputElement';
import { TextInput } from '../TextInput';

interface ITextInputSampleState {
    isValid: boolean;
}

export default class TextInputSample extends React.Component<unknown, ITextInputSampleState> {
    private _textInput: IValueInputElement<string> & IChangingInputElement<string>;

    public state: ITextInputSampleState = {
        isValid: false
    };

    public constructor(props: unknown) {
        super(props);

        this._textInput = new SingleValueInputElement<string, ITextInputProps>(
            { isRequired: true, label: 'Basic text input without validation (required, without error handling)' },
            TextInput,
            { placeholder: 'When you enter something, the button will become enabled.' },
            (): void => {
                if (this.state.isValid !== this._textInput.isValid) this.setState({ isValid: this._textInput.isValid });
            }
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
