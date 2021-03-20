import * as React from 'react';
import { IInputElement, ITextInputProps, SingleValueInputElement, TextInput, UpdateCallback } from '@try-at-software/input-elements';
import { Checkbox } from 'office-ui-fabric-react';

interface INonRequiredValueSample {
    isValid: boolean;
    hasChanges: boolean;
}

export default class NonRequiredValueSample extends React.Component<unknown, INonRequiredValueSample> {
    private _inputElement: IInputElement;

    public constructor(props: unknown) {
        super(props);

        this._inputElement = new SingleValueInputElement<string, ITextInputProps>(
            { isRequired: false, label: 'Not a required input element' },
            TextInput,
            { placeholder: 'Examine the validness of the input element when there is no value entered.' },
            this.updateForm
        );

        this.state = {
            isValid: this._inputElement.isValid,
            hasChanges: this._inputElement.hasChanges
        };
    }

    private updateForm: UpdateCallback = (): void => {
        if (this._inputElement.isValid === this.state.isValid && this._inputElement.hasChanges === this.state.hasChanges) return;

        this.setState({
            isValid: this._inputElement.isValid,
            hasChanges: this._inputElement.hasChanges
        });
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group non-required-value">
                {this._inputElement.render()}
                <Checkbox label="Is valid" checked={this.state.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this.state.hasChanges} disabled={true} />
            </div>
        );
    }
}
