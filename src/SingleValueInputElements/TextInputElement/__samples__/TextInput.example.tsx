import * as React from 'react';
import { ITextInputProps, IValueInputElement, SingleValueInputElement, TextInput } from '@try-at-software/input-elements';
import { PrimaryButton } from 'office-ui-fabric-react';

export default class TextInputSample extends React.Component {
    private _textInput: IValueInputElement<string>;

    public constructor(props: unknown) {
        super(props);

        this._textInput = new SingleValueInputElement<string, ITextInputProps>(
            { isRequired: true, label: 'Basic text input without validation (required, without error handling)' },
            TextInput,
            { placeholder: 'When you enter something, the button will become enabled.' },
            (): void => this.forceUpdate()
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
