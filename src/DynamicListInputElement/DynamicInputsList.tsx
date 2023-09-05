import * as React from 'react';
import { DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { combineClasses } from '../Utilities';
import { IInputInformation } from './DynamicListInputElement';
import { InternalDynamicInput } from './IDynamicListInputElement';
import './DynamicInputsList.less';

export interface IDynamicInputListProps<TValue> {
    className: string;
    inputs: IInputInformation<TValue>[];
    onDragEnd: (result: DropResult) => void;
    renderMenu: (index: number) => JSX.Element;
    renderFooterMenu: () => JSX.Element;

    renderMoveGripper?: () => JSX.Element;
}

export class DynamicInputsList<TValue> extends React.Component<IDynamicInputListProps<TValue>> {
    public render(): JSX.Element {
        return (
            <div className={combineClasses('tas-dynamic-list-input', this.props.className)}>
                <DragDropContext onDragEnd={this.props.onDragEnd}>
                    <Droppable droppableId="default-inputs-list">
                        {(provided: DroppableProvided): React.ReactElement => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {this.renderInputsList()}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {this.props.renderFooterMenu()}
            </div>
        );
    }

    private renderInputsList(): JSX.Element {
        return (
            <>
                {this.props.inputs.map((i, index): JSX.Element => {
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
                })}
            </>
        );
    }

    private renderDynamicInput(input: InternalDynamicInput<TValue>, index: number): JSX.Element {
        if (!input || index < 0) return null;

        return (
            <>
                <div className="tas-move-gripper hidable">
                    {!!this.props.renderMoveGripper ? this.props.renderMoveGripper() : <span>#{index + 1}</span>}
                </div>
                <div className="tas-input-element-wrapper">{input.render()}</div>
                <div className="tas-menu-wrapper">{this.props.renderMenu(index)}</div>
            </>
        );
    }
}
