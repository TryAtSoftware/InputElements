import * as React from 'react';
import { IInputElement, UpdateCallback } from '../../IInputElement';
import { ITextInputProps, SingleValueInputElement, TextInput, UpdateType } from '@try-at-software/input-elements';
import { Checkbox } from 'office-ui-fabric-react';

export default class NonRequiredValueSample extends React.Component {
    private _inputElement: IInputElement;

    public constructor(props: unknown) {
        super(props);

        this._inputElement = new SingleValueInputElement<string, ITextInputProps>(
            { isRequired: false, label: 'Not a required input element' },
            TextInput,
            { placeholder: 'Examine the validness of the input element when there is no value entered.' },
            this.updateForm
        );
    }

    private updateForm: UpdateCallback = (updateType: UpdateType): void => {
        console.log(updateType);
        this.forceUpdate();
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group non-required-value">
                {this._inputElement.render()}
                <Checkbox label="Is valid" checked={this._inputElement.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this._inputElement.hasChanges} disabled={true} />
            </div>
        );
    }
}
