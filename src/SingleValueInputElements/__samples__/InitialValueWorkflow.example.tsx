import * as React from 'react';
import {
    IChangingInputElement,
    ITextInputProps,
    IValueInputElement,
    SingleValueInputElement,
    TextInput,
    UpdateCallback
} from '@try-at-software/input-elements';
import { Checkbox } from '@fluentui/react';

interface IInitialValueWorkflowSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class InitialValueWorkflowSample extends React.Component<unknown, IInitialValueWorkflowSampleState> {
    private _inputElement: IValueInputElement<string> & IChangingInputElement<string>;

    public constructor(props: unknown) {
        super(props);

        this._inputElement = new SingleValueInputElement<string, ITextInputProps>(
            { isRequired: true, label: 'Required input element with initial value being set' },
            TextInput,
            {
                placeholder: 'Examine how the `hasChanges` property will change if you insert the initial value once again.'
            },
            this.updateForm
        );

        this._inputElement.setInitialValue('This is my initial value.');

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
            <div className="sample-group basic-workflow">
                {this._inputElement.render()}
                <Checkbox label="Is valid" checked={this.state.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this.state.hasChanges} disabled={true} />
            </div>
        );
    }
}
