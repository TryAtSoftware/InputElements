import * as React from 'react';
import { Checkbox, DefaultButton, Label, PrimaryButton, Stack } from 'office-ui-fabric-react';
import { IDropdownInputOption, IDropdownInputProps, UpdateCallback } from '@try-at-software/input-elements';
import { DependentInputElementInitializer } from '../DependentInputElementInitializer';
import { DropdownInput } from '../../DropdownInputElement/DropdownInput';
import { ISingleValueInputElement } from '../../ISingleValueInputElement';
import { SingleValueInputElement } from '../../SingleValueInputElement';

export default class HidingDependentInputSample extends React.Component {
    private _principalInput: ISingleValueInputElement<string, IDropdownInputProps>;

    private _dependentInput: ISingleValueInputElement<string, IDropdownInputProps>;

    public constructor(props: unknown) {
        super(props);

        const options: string[] = [];
        for (let i = 0; i < 10; i++) options.push(i.toString());

        this._principalInput = new SingleValueInputElement<string, IDropdownInputProps>(
            { isRequired: true, label: 'Hiding principal dropdown (required, without error handling)' },
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
                    <DefaultButton text="Hide" onClick={this.hide} disabled={!this._principalInput.isVisible} />
                    <DefaultButton text="Show" onClick={this.show} disabled={this._principalInput.isVisible} />
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

    private show = (): void => {
        this._principalInput.show();
    };

    private hide = (): void => {
        this._principalInput.hide();
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
