import * as React from 'react';
import { combineClasses } from '../Utilities';
import { IInputInformation } from './DynamicListInputElement';
import { InternalDynamicInput } from './IDynamicListInputElement';
import './DynamicInputsList.less';

export interface IDynamicInputListProps<TValue> {
    className: string;
    inputs: IInputInformation<TValue>[];
    renderMenu: (index: number) => JSX.Element;
    renderFooterMenu: () => JSX.Element;
}

export class DynamicInputsList<TValue> extends React.Component<IDynamicInputListProps<TValue>> {
    public render(): JSX.Element {
        return (
            <div className={combineClasses('tas-dynamic-list-input', this.props.className)}>
                {this.renderInputsList()}
                {this.props.renderFooterMenu()}
            </div>
        );
    }

    private renderInputsList(): JSX.Element {
        return (
            <>
                {this.props.inputs.map((i, index): JSX.Element => {
                    return (
                        <div key={i.uniqueId} className="tas-dynamic-input-element">
                            {this.renderDynamicInput(i.input, index)}
                        </div>
                    );
                })}
            </>
        );
    }

    private renderDynamicInput(input: InternalDynamicInput<TValue>, index: number): JSX.Element {
        if (!input || index < 0) return null;

        return (
            <>
                <div className="tas-input-element-wrapper">{input.render()}</div>
                <div className="tas-menu-wrapper">{this.props.renderMenu(index)}</div>
            </>
        );
    }
}
