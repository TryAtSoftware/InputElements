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

export default class DynamicListInputElement<TValue> extends InputElement implements IDynamicListInputElement<TValue> {
    private _inputs: Array<ISingleValueInputElement<TValue>>;

    public constructor(
        initialInput: ISingleValueInputElement<TValue>,
        inputOptions: Array<IDynamicListMenuOption<TValue>>,
        update: UpdateCallback
    ) {
        super(update);

        // TODO: The initial input should not be falsy.
        this._inputs = new Array<ISingleValueInputElement<TValue>>(initialInput);
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

    /**
     * @inheritdoc
     */
    public get inputs(): Array<ISingleValueInputElement<TValue>> {
        return this._inputs.filter((i): boolean => !!i);
    }

    /**
     * @inheritdoc
     */
    public get isValid(): boolean {
        return this.inputs?.every((i): boolean => i.isValid);
    }

    /**
     * @inheritdoc
     */
    public get value(): Array<TValue> {
        return this.inputs?.map((i): TValue => i.value);
    }

    /**
     * @inheritdoc
     */
    public renderComponent(): JSX.Element {
        return (
            <div className="tas-dynamic-list-input">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="default-inputs-list">
                        {(provided): React.ReactElement => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {this.inputs?.map(
                                    (i, index): JSX.Element => {
                                        if (!!i?.configuration?.label)
                                            i.configuration.label = `${i.configuration.label.replace(/\s#\d/, '')} #${
                                                index + 1
                                            }`;

                                        return (
                                            <Draggable key={index} draggableId={index.toString()} index={index}>
                                                {(provided): React.ReactElement => (
                                                    <div
                                                        className="tas-dynamic-input-element"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div className="tas-move-gripper">
                                                            <span>Drag</span>
                                                        </div>
                                                        <div className="tas-input-element-wrapper">{i.render()}</div>
                                                        <div className="tas-menu-wrapper">
                                                            <DynamicListMenu
                                                                options={this.inputOptions}
                                                                onAddClicked={(createdInput): void => {
                                                                    this._inputs.splice(index + 1, 0, createdInput);
                                                                    this.updateInternally(UpdateType.System);
                                                                }}
                                                                onRemoveClicked={(): void => {
                                                                    this._inputs.splice(index, 1);
                                                                    this.updateInternally(UpdateType.System);
                                                                }}
                                                                showRemoveButton={this.inputs.length > 1}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    }
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }

    private onDragEnd = (result: DropResult): void => {
        if (!result?.destination) return;

        this.reorder(result.source.index, result.destination.index);
        this.update(UpdateType.System);
    };

    private reorder = (startIndex: number, endIndex: number): void => {
        const result = Array.from(this._inputs);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        this._inputs = result;
    };
}
