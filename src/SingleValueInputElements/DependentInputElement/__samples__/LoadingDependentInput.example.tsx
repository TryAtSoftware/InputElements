import * as React from 'react';
import { Checkbox, DefaultButton, Label, PrimaryButton, Stack } from 'office-ui-fabric-react';
import {
    DependentInputElementInitializer,
    DropdownInput,
    IDropdownInputOption,
    IDropdownInputProps,
    ISingleValueInputElement,
    SingleValueInputElement,
    UpdateCallback
} from '@try-at-software/input-elements';

export default class LoadingDependentInputSample extends React.Component {
    private loadingFinishedCallback: () => void;

    private _principalInput: ISingleValueInputElement<string, IDropdownInputProps>;

    private _dependentInput: ISingleValueInputElement<string, IDropdownInputProps>;

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._principalInput = new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true, label: 'Loading principal dropdown (required, without error handling)' },
            DropdownInput,
            {
                options: this.mapToDropdownOptions(options),
                placeholder: 'When you change the value, the dependent dropdown will appear.'
            },
            this.updateForm
        );

        this._dependentInput = new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true, label: 'Dependent dropdown (required, without error handling)' },
            DropdownInput,
            {
                placeholder: 'When you change the value, the button will become enabled and this message will disappear.'
            },
            this.updateForm
        );

        DependentInputElementInitializer.initializeDependency(
            this._principalInput,
            this._dependentInput,
            (newPrincipalValue: string, doneCallback: () => void): void => {
                const dependentOptions: string[] = [];
                for (let i = 0; i < 10; i++) dependentOptions.push(newPrincipalValue + i);

                this._dependentInput.componentProps.options = this.mapToDropdownOptions(dependentOptions);

                doneCallback();
            }
        );
    }

    public render(): JSX.Element {
        return (
            <div className="sample-group basic-dropdown-input">
                {this._principalInput.render()}
                {this._dependentInput.render()}
                <Stack horizontal tokens={{ childrenGap: 5 }}>
                    <PrimaryButton text="Submit" disabled={!this._dependentInput.isValid} onClick={this.printValues} />
                    <DefaultButton text="Start loading" onClick={this.startLoading} disabled={!!this.loadingFinishedCallback} />
                    <DefaultButton text="Finish loading" onClick={this.finishLoading} disabled={!this.loadingFinishedCallback} />
                </Stack>
                <Stack horizontal tokens={{ childrenGap: 50 }}>
                    <div>
                        <Label>Principal input:</Label>
                        <Checkbox label="Is valid" checked={this._principalInput.isValid} disabled={true} />
                        <Checkbox label="Has changes" checked={this._principalInput.hasChanges} disabled={true} />
                        <Checkbox label="Is loading" checked={this._principalInput.isLoading} disabled={true} />
                        <Checkbox label="Is visible" checked={this._principalInput.isVisible} disabled={true} />
                    </div>

                    <div>
                        <Label>Dependent input:</Label>
                        <Checkbox label="Is valid" checked={this._dependentInput.isValid} disabled={true} />
                        <Checkbox label="Has changes" checked={this._dependentInput.hasChanges} disabled={true} />
                        <Checkbox label="Is loading" checked={this._dependentInput.isLoading} disabled={true} />
                        <Checkbox label="Is visible" checked={this._dependentInput.isVisible} disabled={true} />
                    </div>
                </Stack>
            </div>
        );
    }

    private updateForm: UpdateCallback = (): void => {
        this.forceUpdate();
    };

    private printValues = (): void => {
        console.log('Principal value: ' + this._principalInput.value);
        console.log('Dependent value: ' + this._dependentInput.value);
    };

    private startLoading = (): void => {
        this._principalInput.load((doneCallback: () => void): void => {
            this.loadingFinishedCallback = doneCallback;
        });
    };

    private finishLoading = (): void => {
        this.loadingFinishedCallback();
        this.loadingFinishedCallback = null;
    };

    private mapToDropdownOptions(values: string[]): IDropdownInputOption[] {
        return values
            ?.filter((x): boolean => !!x)
            ?.map(
                (o): IDropdownInputOption => {
                    return {
                        key: o,
                        text: o
                    };
                }
            );
    }
}
