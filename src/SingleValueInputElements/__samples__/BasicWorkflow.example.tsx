import * as React from 'react';
import { IInputElement, UpdateCallback } from '../../IInputElement';
import { ITextInputProps, SingleValueInputElement, TextInput, UpdateType } from '@try-at-software/input-elements';
import { Checkbox } from 'office-ui-fabric-react';

export default class BasicWorkflowSample extends React.Component {
    private _inputElement: IInputElement;

    public constructor(props: unknown) {
        super(props);

        this._inputElement = new SingleValueInputElement<string, ITextInputProps>(
            { isRequired: true, label: 'Required input element' },
            TextInput,
            { placeholder: 'Enter some value and observe how the checkboxes will react to it.' },
            this.updateForm
        );
    }

    private updateForm: UpdateCallback = (updateType: UpdateType): void => {
        console.log(updateType);
        this.forceUpdate();
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-workflow">
                {this._inputElement.render()}
                <Checkbox label="Is valid" checked={this._inputElement.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this._inputElement.hasChanges} disabled={true} />
            </div>
        );
    }
}
