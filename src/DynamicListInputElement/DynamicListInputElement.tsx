import * as React from 'react';
import { DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { IDynamicListInputElement, IDynamicValueChange, InternalDynamicInput } from './IDynamicListInputElement';
import { combineClasses } from '../Utilities/StylingHelper';
import { DynamicListMenu } from './Menu/DynamicListMenu';
import { ExtendedConfigurableInputElement } from '../ExtendedConfigurableInputElement';
import { IDynamicListInputElementConfiguration } from './IDynamicListInputElementConfiguration';
import { IDynamicListMenuOption } from './Menu/IDynamicListMenuOption';
import { ISingleValueInputElement } from '../SingleValueInputElements/ISingleValueInputElement';
import { UpdateCallback } from '../IInputElement';
import { UpdateType } from '../UpdateType';
import { ValidationRule } from 'src/IValueInputElement';
import './DynamicListInputElement.less';

export interface IInputInformation<TValue> {
    uniqueId: number;
    input: InternalDynamicInput<TValue>;
}

export class DynamicListInputElement<TValue>
    extends ExtendedConfigurableInputElement<IDynamicListInputElementConfiguration, IDynamicValueChange<TValue>[]>
    implements IDynamicListInputElement<TValue> {
    private static counter = 0;

    private _inputs: IInputInformation<TValue>[];

    public constructor(
        configuration: IDynamicListInputElementConfiguration,
        inputOptions: IDynamicListMenuOption<TValue>[],
        update: UpdateCallback
    ) {
        super(configuration, update);

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
            (!this.configuration?.isRequired && (!this.inputs || this.inputs.length <= 0)) ||
            (!!this.inputs && this.inputs.length > 0 && this.inputs?.every((i): boolean => i.isValid))
        );
    }

    /** @inheritdoc */
    public get value(): TValue[] {
        return this.inputs?.map((i): TValue => i.value);
    }

    /** @inheritdoc */
    public renderComponent(): JSX.Element {
        return (
            <div className={combineClasses('tas-dynamic-list-input', this.configuration?.className)}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="default-inputs-list">
                        {(provided: DroppableProvided): React.ReactElement => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {this.renderInputsList()}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {this.renderFooterMenu()}
            </div>
        );
    }

    private renderInputsList(): JSX.Element {
        return (
            <>
                {this.filterInputs().map(
                    (i, index): JSX.Element => {
                        return (
                            <Draggable key={i.uniqueId} draggableId={i.uniqueId.toString()} index={index}>
                                {(provided: DraggableProvided): React.ReactElement => (
                                    <div
                                        className="tas-dynamic-input-element"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        {this.renderDynamicInput(i.input, index)}
                                    </div>
                                )}
                            </Draggable>
                        );
                    }
                )}
            </>
        );
    }

    private renderDynamicInput(input: InternalDynamicInput<TValue>, index: number): JSX.Element {
        if (!input || index < 0) return null;

        return (
            <>
                <div className="tas-move-gripper hidable">
                    {!!this.configuration?.renderMoveGripper ? this.configuration.renderMoveGripper() : <span>#{index + 1}</span>}
                </div>
                <div className="tas-input-element-wrapper">{input.render()}</div>
                <div className="tas-menu-wrapper">{this.renderMenu(index)}</div>
            </>
        );
    }

    private renderMenu(index: number): JSX.Element {
        return (
            <DynamicListMenu
                options={this.inputOptions}
                onAddClicked={(createdInput): void => {
                    this._inputs.splice(index + 1, 0, this.convert(createdInput));
                    this.updateInternally(UpdateType.System);
                }}
                onRemoveClicked={(): void => {
                    this._inputs.splice(index, 1);
                    this.updateInternally(UpdateType.System);
                }}
                insertButtonConfig={{
                    ...this.configuration?.insertButtonConfig,
                    isEnabled: true,
                    show: this.configuration?.canInsertValues
                }}
                removeButtonConfig={{
                    ...this.configuration?.removeButtonConfig,
                    isEnabled: this.inputs.length > 1 || this.configuration?.canRemoveAllInputs,
                    show: this.configuration?.canRemoveValues
                }}
            />
        );
    }

    private renderFooterMenu(): JSX.Element {
        return (
            <DynamicListMenu
                options={this.inputOptions}
                onAddClicked={this.onAddNewValue}
                insertButtonConfig={{
                    className: this.configuration?.addButtonConfig?.className,
                    iconName: this.configuration?.addButtonConfig?.iconName,
                    label: this.configuration?.addButtonConfig?.label || 'Add new element',
                    isEnabled: true,
                    show: true
                }}
                removeButtonConfig={{
                    show: false
                }}
            />
        );
    }

    private onAddNewValue = (createdInput: ISingleValueInputElement<TValue>): void => {
        this._inputs.push(this.convert(createdInput));
        this.updateInternally(UpdateType.System);
    };

    private onDragEnd = (result: DropResult): void => {
        if (!result?.destination) return;

        this.reorder(result.source.index, result.destination.index);
        this.update(UpdateType.System);
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
        const newInputs: IInputInformation<TValue>[] = [];

        if (!!valueChange) {
            valueChange
                .filter((x): boolean => !!x?.inputCreationCallback)
                .forEach((vc): void => {
                    const createdInput = vc.inputCreationCallback();

                    if (!createdInput) return;

                    if (isInitial) createdInput.setInitialValue(vc.value);
                    else createdInput.setValue(vc.value);

                    newInputs.push(this.convert(createdInput));
                });
        }

        this._inputs = newInputs;
    }

    private filterInputs(): IInputInformation<TValue>[] {
        return this._inputs?.filter((i): boolean => !!i?.input);
    }
}
