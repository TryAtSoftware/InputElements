import { Checkbox, DefaultButton, PrimaryButton, Stack } from '@fluentui/react';
import * as React from 'react';
import { UpdateCallback } from '../../IInputElement';
import { DynamicListInputElement } from '../DynamicListInputElement';
import { IDynamicListInputElement } from '../IDynamicListInputElement';
import { createDropdown } from './DynamicListInputElementSamplesHelper';

interface IMultifunctionalListInputElementSampleState {
    isValid: boolean;
    isVisible: boolean;
    isLoading: boolean;
    hasChanges: boolean;
}

export class MultifunctionalListInputElementSample extends React.Component<unknown, IMultifunctionalListInputElementSampleState> {
    private _inputElement: IDynamicListInputElement<string>;
    private loadingFinishedCallback: () => void;

    public constructor(props: unknown) {
        super(props);

        this._inputElement = new DynamicListInputElement(
            {
                isRequired: true,
                canInsertValues: false,
                canRemoveValues: true,
                canRemoveAllInputs: true
            },
            [
                {
                    name: 'Dropdown',
                    icon: 'Dropdown',
                    createInput: createDropdown(this.updateForm)
                }
            ],
            this.updateForm
        );

        this.state = {
            isValid: this._inputElement.isValid,
            hasChanges: this._inputElement.hasChanges,
            isLoading: this._inputElement.hasChanges,
            isVisible: this._inputElement.isVisible
        };
    }

    private updateForm: UpdateCallback = (): void => {
        if (
            this._inputElement.isValid === this.state.isValid &&
            this._inputElement.hasChanges === this.state.hasChanges &&
            this._inputElement.isVisible === this.state.isVisible &&
            this._inputElement.isLoading === this.state.isLoading
        )
            return;

        this.setState({
            isValid: this._inputElement.isValid,
            hasChanges: this._inputElement.hasChanges,
            isVisible: this._inputElement.isVisible,
            isLoading: this._inputElement.isLoading
        });
    };

    public render(): JSX.Element {
        return (
            <div className="sample-group dynamic-list-input-element">
                {this._inputElement.render()}
                <PrimaryButton text="Submit" disabled={!this.state.isValid || !this.state.hasChanges} onClick={this.printValues} />
                <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <DefaultButton text="Show" onClick={this.show} disabled={this._inputElement.isVisible} />
                    <DefaultButton text="Hide" onClick={this.hide} disabled={!this._inputElement.isVisible} />
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <DefaultButton text="Start loading" onClick={this.startLoading} disabled={!!this.loadingFinishedCallback} />
                    <DefaultButton text="Finish loading" onClick={this.finishLoading} disabled={!this.loadingFinishedCallback} />
                </Stack>
                <Checkbox label="Is valid" checked={this.state.isValid} disabled={true} />
                <Checkbox label="Has changes" checked={this.state.hasChanges} disabled={true} />
                <Checkbox label="Is visible" checked={this.state.isVisible} disabled={true} />
                <Checkbox label="Is loading" checked={this.state.isLoading} disabled={true} />
            </div>
        );
    }

    private show = (): void => {
        this._inputElement.show();
    };

    private hide = (): void => {
        this._inputElement.hide();
    };

    private startLoading = (): void => {
        this._inputElement.load((doneCallback: () => void): void => {
            this.loadingFinishedCallback = doneCallback;
        });
    };

    private finishLoading = (): void => {
        this.loadingFinishedCallback();
        this.loadingFinishedCallback = null;
    };

    private printValues = (): void => {
        console.log(this._inputElement.value);
    };
}
