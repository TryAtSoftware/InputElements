import { IHidingInputElement, ITextInputProps, SingleValueInputElement, TextInput, UpdateCallback } from '@try-at-software/input-elements';
import { Checkbox, DefaultButton, Stack } from '@fluentui/react';
import * as React from 'react';

interface IHidingInputElementSampleState {
    isValid: boolean;
    isVisible: boolean;
    hasChanges: boolean;
}

export default class HidingInputElementsSample extends React.Component<unknown, IHidingInputElementSampleState> {
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

        this.state = {
            isValid: this._inputElement.isValid,
            hasChanges: this._inputElement.hasChanges,
            isVisible: this._inputElement.isVisible
        };
    }

    private updateForm: UpdateCallback = (): void => {
        if (
            this._inputElement.isValid === this.state.isValid &&
            this._inputElement.isVisible === this.state.isVisible &&
            this._inputElement.hasChanges === this.state.hasChanges
        )
            return;

        this.setState({
            isValid: this._inputElement.isValid,
            isVisible: this._inputElement.isVisible,
            hasChanges: this._inputElement.hasChanges
        });
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
                <Checkbox label="Is valid" checked={this.state.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this.state.hasChanges} disabled={true} />
                <Checkbox label="Is visible" checked={this.state.isVisible} disabled={true} />
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
