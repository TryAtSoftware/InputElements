import * as React from 'react';
import { Checkbox, DefaultButton, Stack } from 'office-ui-fabric-react';
import { ILoadingInputElement, ITextInputProps, SingleValueInputElement, TextInput, UpdateType } from '@try-at-software/input-elements';
import { UpdateCallback } from '../../IInputElement';

export default class LoadingInputElementsSample extends React.Component {
    private loadingFinishedCallback: () => void;

    private _inputElement: ILoadingInputElement;

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

    private updateForm: UpdateCallback = (updateType: UpdateType): void => {
        console.log(updateType);
        this.forceUpdate();
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group loading-input-elements">
                {this._inputElement.render()}
                <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <DefaultButton text="Start loading" onClick={this.startLoading} disabled={!!this.loadingFinishedCallback} />
                    <DefaultButton text="Finish loading" onClick={this.finishLoading} disabled={!this.loadingFinishedCallback} />
                </Stack>
                <Checkbox label="Is valid" checked={this._inputElement.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this._inputElement.hasChanges} disabled={true} />
                <Checkbox label="Is loading" checked={this._inputElement.isLoading} disabled={true} />
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
