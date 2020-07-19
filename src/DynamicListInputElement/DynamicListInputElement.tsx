import * as React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import DynamicListMenu from './Menu/DynamicListMenu';
import IDynamicListInputElement from './IDynamicListInputElement';
import IDynamicListMenuOption from './Menu/IDynamicListMenuOption';
import InputElement from '../InputElement';
import ISingleValueInputElement from '../SingleValueInputElements/ISingleValueInputElement';
import { UpdateCallback } from '../IInputElement';
import UpdateType from '../UpdateType';
import { ValidationRule } from '../IValueInputElement';
import './DynamicListInputElement.less';

interface IInputInformation<TValue> {
    uniqueId: number;
    input: ISingleValueInputElement<TValue>;
}

export default class DynamicListInputElement<TValue> extends InputElement implements IDynamicListInputElement<TValue> {
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

    public validationRules: Array<ValidationRule<TValue[]>>;

    public validate(): void {
        this.inputs.forEach((x): void => x.validate());
    }

    public get hasChanges(): boolean {
        return this.inputs.some((x): boolean => x.hasChanges);
    }

    public setValue(value: TValue[]): void {
        console.log(value);
    }

    public setInitialValue(value: TValue[]): void {
        console.log(value);
    }

    public isLoading: boolean;

    public load(action: (doneCallback: () => void) => void): void {
        console.log(action);
    }

    public isVisible: boolean;

    public hide(): void {
        throw new Error('Method not implemented.');
    }

    public show(): void {
        throw new Error('Method not implemented.');
    }

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
                    #{index + 1}
                    {/* <span>#{index + 1}</span> */}
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
        const result = Array.from(this._inputs);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        this._inputs = result;
    }

    private convert(input: ISingleValueInputElement<TValue>): IInputInformation<TValue> {
        if (!input) return null;

        return {
            uniqueId: DynamicListInputElement.counter++,
            input: input
        };
    }

    private filterInputs(): Array<IInputInformation<TValue>> {
        return this._inputs?.filter((i): boolean => !!i?.input);
    }
}
