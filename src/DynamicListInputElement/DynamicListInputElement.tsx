import * as React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import IDynamicListInputElement, { IDynamicValueChange } from './IDynamicListInputElement';
import DynamicListMenu from './Menu/DynamicListMenu';
import ExtendedInputElement from '../ExtendedInputElement';
import IDynamicListMenuOption from './Menu/IDynamicListMenuOption';
import ISingleValueInputElement from '../SingleValueInputElements/ISingleValueInputElement';
import { UpdateCallback } from '../IInputElement';
import UpdateType from '../UpdateType';
import { ValidationRule } from '../IValueInputElement';
import './DynamicListInputElement.less';

interface IInputInformation<TValue> {
    uniqueId: number;
    input: ISingleValueInputElement<TValue>;
}

export default class DynamicListInputElement<TValue> extends ExtendedInputElement
    implements IDynamicListInputElement<TValue> {
    private static counter = 0;

    private _inputs: Array<IInputInformation<TValue>>;

    public constructor(
        initialInput: ISingleValueInputElement<TValue>,
        inputOptions: Array<IDynamicListMenuOption<TValue>>,
        update: UpdateCallback
    ) {
        super(update);

        if (!initialInput) throw new Error('The initial input should always be passed');

        this._inputs = new Array<IInputInformation<TValue>>(this.convert(initialInput));
        this.inputOptions = inputOptions;
    }

    /**
     * @inheritdoc
     * This property will be unused.
     */
    public validationRules: Array<ValidationRule<TValue[]>>;

    /** @inheritdoc */
    public validate(): void {
        this.inputs.forEach((x): void => x.validate());
    }

    /** @inheritdoc */
    public get hasChanges(): boolean {
        return this.inputs.some((x): boolean => x.hasChanges);
    }

    /** @inheritdoc */
    public setValue(valueChange: IDynamicValueChange<TValue>[]): void {
        this.setInternalValue(valueChange, (input, value): void => {
            input?.setValue(value);
        });
    }

    /** @inheritdoc */
    public setInitialValue(valueChange: IDynamicValueChange<TValue>[]): void {
        this.setInternalValue(valueChange, (input, value): void => {
            input?.setInitialValue(value);
        });
    }

    /** @inheritdoc */
    public inputOptions: Array<IDynamicListMenuOption<TValue>>;

    /** @inheritdoc */
    public get inputs(): Array<ISingleValueInputElement<TValue>> {
        return this.filterInputs().map((i): ISingleValueInputElement<TValue> => i.input);
    }

    /** @inheritdoc */
    public get isValid(): boolean {
        return this.inputs?.every((i): boolean => i.isValid);
    }

    /** @inheritdoc */
    public get value(): Array<TValue> {
        return this.inputs?.map((i): TValue => i.value);
    }

    /** @inheritdoc */
    public renderComponent(): JSX.Element {
        return (
            <div className="tas-dynamic-list-input">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="default-inputs-list">
                        {(provided): React.ReactElement => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {this.renderInputsList()}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
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
                                {(provided): React.ReactElement => (
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

    private renderDynamicInput(input: ISingleValueInputElement<TValue>, index: number): JSX.Element {
        if (!input || index < 0) return null;

        return (
            <>
                <div className="tas-move-gripper hidable">
                    <span>#{index + 1}</span>
                </div>
                <div className="tas-input-element-wrapper">{input.render()}</div>
                <div className="tas-menu-wrapper">
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
                        showRemoveButton={this.inputs.length > 1}
                    />
                </div>
            </>
        );
    }

    private onDragEnd = (result: DropResult): void => {
        if (!result?.destination) return;

        this.reorder(result.source.index, result.destination.index);
        this.update(UpdateType.System);
    };

    private reorder(startIndex: number, endIndex: number): void {
        const [removed] = this._inputs.splice(startIndex, 1);
        this._inputs.splice(endIndex, 0, removed);
    }

    private convert(input: ISingleValueInputElement<TValue>): IInputInformation<TValue> {
        if (!input) return null;

        return {
            uniqueId: DynamicListInputElement.counter++,
            input: input
        };
    }

    private setInternalValue(
        valueChange: IDynamicValueChange<TValue>[],
        setValueCallback: (createdInput: ISingleValueInputElement<TValue>, value: TValue) => void
    ): void {
        const newInputs: Array<IInputInformation<TValue>> = [];

        if (!valueChange) return;

        valueChange
            .filter((x): boolean => !!x?.inputCreationOption)
            .forEach((vc): void => {
                const createdInput = vc.inputCreationOption.createInput();

                if (!createdInput) return;

                setValueCallback(createdInput, vc.value);
                newInputs.push(this.convert(createdInput));
            });

        this._inputs = newInputs;
    }

    private filterInputs(): Array<IInputInformation<TValue>> {
        return this._inputs?.filter((i): boolean => !!i?.input);
    }
}
