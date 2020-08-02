import * as React from 'react';
import { IChangingInputElement, ITextInputProps, SingleValueInputElement, TextInput, UpdateType } from '@try-at-software/input-elements';
import { Checkbox } from 'office-ui-fabric-react';
import { IValueInputElement } from '../../IValueInputElement';
import { UpdateCallback } from '../../IInputElement';

export default class InitialValueWorkflowSample extends React.Component {
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
    }

    private updateForm: UpdateCallback = (updateType: UpdateType): void => {
        if (updateType === UpdateType.Initial) return;
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
