import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react';
import IChangingInputElement from './../../IChangingInputElement';
import ITextInputProps from '../TextInputElement/ITextInputProps';
import { IValueInputElement } from '../../IValueInputElement';
import SingleValueInputElement from '../SingleValueInputElement';
import TextInput from '../TextInputElement/TextInput';
import { UpdateCallback } from '../../IInputElement';
import UpdateType from '../../UpdateType';

export default class InitialValueWorkflowSample extends React.Component {
    private _inputElement: IValueInputElement<string> & IChangingInputElement<string>;

    public constructor(props: unknown) {
        super(props);

        this._inputElement = new SingleValueInputElement<string, ITextInputProps>(
            { isRequired: true, label: 'Required input element with initial value being set' },
            TextInput,
            {
                placeholder:
                    'Examine how the `hasChanges` property will change if you insert the initial value once again.'
            },
            this.updateForm
        );

        this._inputElement.setInitialValue('This is my initial value.');
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
