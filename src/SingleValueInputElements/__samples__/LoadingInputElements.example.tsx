import * as React from 'react';
import { Checkbox, DefaultButton, Stack } from 'office-ui-fabric-react';
import { ITextInputProps, TextInput } from '../TextInputElement';
import { ILoadingInputElement } from '../../ILoadingInputElement';
import { SingleValueInputElement } from '../SingleValueInputElement';
import { UpdateCallback } from '../../IInputElement';

interface ILoadingInputElementSampleState {
    isValid: boolean;
    isLoading: boolean;
    hasChanges: boolean;
}

export default class LoadingInputElementsSample extends React.Component<unknown, ILoadingInputElementSampleState> {
    private loadingFinishedCallback: () => void;

    private _inputElement: ILoadingInputElement;

    public state: ILoadingInputElementSampleState = {
        isLoading: false,
        isValid: false,
        hasChanges: false
    };

    public constructor(props: unknown) {
        super(props);

        this._inputElement = new SingleValueInputElement<string, ITextInputProps>(
            { isRequired: true, label: 'Loading required input element' },
            TextInput,
            {
                placeholder: 'Enter some value and examine the behavior after pressing the buttons managing the loading state.'
            },
            this.updateForm
        );
    }

    private updateForm: UpdateCallback = (): void => {
        if (
            this._inputElement.isValid === this.state.isValid &&
            this._inputElement.isLoading === this.state.isLoading &&
            this._inputElement.hasChanges === this.state.hasChanges
        )
            return;

        this.setState({
            isValid: this._inputElement.isValid,
            isLoading: this._inputElement.isLoading,
            hasChanges: this._inputElement.hasChanges
        });
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group loading-input-elements">
                {this._inputElement.render()}
                <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <DefaultButton text="Start loading" onClick={this.startLoading} disabled={!!this.loadingFinishedCallback} />
                    <DefaultButton text="Finish loading" onClick={this.finishLoading} disabled={!this.loadingFinishedCallback} />
                </Stack>
                <Checkbox label="Is valid" checked={this.state.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this.state.hasChanges} disabled={true} />
                <Checkbox label="Is loading" checked={this.state.isLoading} disabled={true} />
            </div>
        );
    }

    private startLoading = (): void => {
        this._inputElement.load((doneCallback: () => void): void => {
            this.loadingFinishedCallback = doneCallback;
        });
    };

    private finishLoading = (): void => {
        this.loadingFinishedCallback();
        this.loadingFinishedCallback = null;
    };
}
