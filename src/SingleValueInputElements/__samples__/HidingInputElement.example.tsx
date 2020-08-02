import * as React from 'react';
import { Checkbox, DefaultButton, Stack } from 'office-ui-fabric-react';
import { IHidingInputElement, ITextInputProps, SingleValueInputElement, TextInput, UpdateType } from '@try-at-software/input-elements';
import { UpdateCallback } from '../../IInputElement';

export default class HidingInputElementsSample extends React.Component {
    private _inputElement: IHidingInputElement;

    public constructor(props: unknown) {
        super(props);

        this._inputElement = new SingleValueInputElement<string, ITextInputProps>(
            { isRequired: true, label: 'Hiding required input element' },
            TextInput,
            {
                placeholder: 'Enter some value and examine the behavior after pressing the buttons managing the visibility of the element.'
            },
            this.updateForm
        );
    }

    private updateForm: UpdateCallback = (updateType: UpdateType): void => {
        console.log(updateType);
        this.forceUpdate();
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group loading-input-elements">
                {this._inputElement.render()}
                {!this._inputElement.isVisible && <p>The input element is hidden right now</p>}
                <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <DefaultButton text="Show" onClick={this.show} disabled={this._inputElement.isVisible} />
                    <DefaultButton text="Hide" onClick={this.hide} disabled={!this._inputElement.isVisible} />
                </Stack>
                <Checkbox label="Is valid" checked={this._inputElement.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this._inputElement.hasChanges} disabled={true} />
                <Checkbox label="Is visible" checked={this._inputElement.isVisible} disabled={true} />
            </div>
        );
    }

    private show = (): void => {
        this._inputElement.show();
    };

    private hide = (): void => {
        this._inputElement.hide();
    };
}
