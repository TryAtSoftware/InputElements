import * as React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { ExtendedInputElement } from '../ExtendedInputElement';
import { UpdateCallback } from '../IInputElement';
import { ValidationRule } from '../IValueInputElement';
import { ISingleValueInputElement } from '../SingleValueInputElements';
import { IDynamicListInputElement, IDynamicValueChange, InternalDynamicInput } from './IDynamicListInputElement';
import { IDynamicListInputElementConfiguration } from './IDynamicListInputElementConfiguration';
import { DynamicListInputElementWrapper } from './InternalPresentationComponents/DynamicListInputElementWrapper';
import { DynamicListMenu, IDynamicListMenuOption } from './Menu';

export interface IInputInformation<TValue> {
    uniqueId: number;
    input: InternalDynamicInput<TValue>;
}

export class DynamicListInputElement<TValue>
    extends ExtendedInputElement<IDynamicValueChange<TValue>[], DynamicListInputElementWrapper<TValue>>
    implements IDynamicListInputElement<TValue>
{
    private static counter = 0;

    private readonly _configuration: IDynamicListInputElementConfiguration;
    private _inputs: IInputInformation<TValue>[];

    public constructor(
        config: IDynamicListInputElementConfiguration,
        inputOptions: IDynamicListMenuOption<TValue>[],
        update: UpdateCallback
    ) {
        super(update);

        this._configuration = config;
        this._inputs = [];
        this.inputOptions = inputOptions;
    }

    /**
     * @inheritdoc
     * This property will be unused.
     */
    public validationRules: ValidationRule<TValue[]>[];

    /** @inheritdoc */
    public validate(): void {
        this.inputs.forEach((x): void => x.validate());
    }

    /** @inheritdoc */
    public get hasChanges(): boolean {
        return this.inputs.some((x): boolean => x.hasChanges);
    }

    /** @inheritdoc */
    public inputOptions: IDynamicListMenuOption<TValue>[];

    /** @inheritdoc */
    public get inputs(): InternalDynamicInput<TValue>[] {
        return this.filterInputs().map((i): InternalDynamicInput<TValue> => i.input);
    }

    /** @inheritdoc */
    public get isValid(): boolean {
        return (
            (!this._configuration?.isRequired && (!this.inputs || this.inputs.length <= 0)) ||
            (!!this.inputs && this.inputs.length > 0 && this.inputs?.every((i): boolean => i.isValid))
        );
    }

    /** @inheritdoc */
    public get value(): TValue[] {
        return this.inputs?.map((i): TValue => i.value);
    }

    /** @inheritdoc */
    protected renderComponent(): JSX.Element {
        return (
            <DynamicListInputElementWrapper
                className={this._configuration.className}
                inputs={this.filterInputs()}
                onDragEnd={this.onDragEnd}
                renderMenu={this.renderMenu}
                renderFooterMenu={this.renderFooterMenu}
                loadingComponent={this._configuration?.loadingComponent}
                renderMoveGripper={this._configuration?.renderMoveGripper}
                ref={this._componentRef}
            />
        );
    }

    private renderMenu = (index: number): JSX.Element => {
        return (
            <DynamicListMenu
                options={this.inputOptions}
                onAddClicked={(createdInput): void => {
                    this._inputs.splice(index + 1, 0, this.convert(createdInput));
                    this._componentRef.current?.update(this._inputs);
                    this.updateInternally();
                }}
                onRemoveClicked={(): void => {
                    this._inputs.splice(index, 1);
                    this._componentRef.current?.update(this._inputs);
                    this.updateInternally();
                }}
                insertButtonConfig={{
                    ...this._configuration?.insertButtonConfig,
                    isEnabled: true,
                    show: this._configuration?.canInsertValues
                }}
                removeButtonConfig={{
                    ...this._configuration?.removeButtonConfig,
                    isEnabled: this.inputs.length > 1 || this._configuration?.canRemoveAllInputs,
                    show: this._configuration?.canRemoveValues
                }}
            />
        );
    };

    private renderFooterMenu = (): JSX.Element => {
        return (
            <DynamicListMenu
                options={this.inputOptions}
                onAddClicked={this.onAddNewValue}
                insertButtonConfig={{
                    className: this._configuration?.addButtonConfig?.className,
                    iconName: this._configuration?.addButtonConfig?.iconName,
                    label: this._configuration?.addButtonConfig?.label || 'Add new element',
                    isEnabled: true,
                    show: true
                }}
                removeButtonConfig={{
                    show: false
                }}
            />
        );
    };

    private onAddNewValue = (createdInput: ISingleValueInputElement<TValue>): void => {
        this._inputs.push(this.convert(createdInput));
        this._componentRef.current?.update(this._inputs);
        this.updateInternally();
    };

    private onDragEnd = (result: DropResult): void => {
        if (!result?.destination) return;

        this.reorder(result.source.index, result.destination.index);
        this.update();
    };

    private reorder(startIndex: number, endIndex: number): void {
        const [removed] = this._inputs.splice(startIndex, 1);
        this._inputs.splice(endIndex, 0, removed);
    }

    private convert(input: InternalDynamicInput<TValue>): IInputInformation<TValue> {
        if (!input) return null;

        return {
            uniqueId: DynamicListInputElement.counter++,
            input: input
        };
    }

    protected setInternalValue(valueChange: IDynamicValueChange<TValue>[], isInitial: boolean): void {
        if (!valueChange || !Array.isArray(valueChange)) return;

        const newInputs: IInputInformation<TValue>[] = [];

        valueChange
            .filter((x): boolean => !!x?.inputCreationCallback)
            .forEach((vc): void => {
                const createdInput = vc.inputCreationCallback();

                if (!createdInput) return;

                if (isInitial) createdInput.setInitialValue(vc.value);
                else createdInput.setValue(vc.value);

                newInputs.push(this.convert(createdInput));
            });

        this._inputs = newInputs;
        this._componentRef.current?.update(this._inputs);
    }

    /** @inheritdoc */
    protected resetInternalValue(): void {
        this._inputs = [];
    }

    private filterInputs(): IInputInformation<TValue>[] {
        return this._inputs?.filter((i): boolean => !!i?.input);
    }
}
