import { Checkbox } from '@fluentui/react';
import { IInputElement, prepareInputElement, TextInput, UpdateCallback } from '@try-at-software/input-elements';
import * as React from 'react';

interface IBasicWorkflowSampleState {
    isValid: boolean;
    hasChanges: boolean;
}

export default class BasicWorkflowSample extends React.Component<unknown, IBasicWorkflowSampleState> {
    private _inputElement: IInputElement;

    public constructor(props: unknown) {
        super(props);

        this._inputElement = prepareInputElement<string>(
            { isRequired: true, label: 'Required input element' },
            this.updateForm
        ).materialize(TextInput, { placeholder: 'Enter some value and observe how the checkboxes will react to it.' });

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
