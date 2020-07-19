import * as React from 'react';
import {
    ActionButton,
    CommandButton,
    IContextualMenuItem,
    IContextualMenuProps,
    PrimaryButton
} from 'office-ui-fabric-react';
import IDynamicListMenuProps from './IDynamicListMenuProps';

export default class DynamicListMenu<TValue> extends React.Component<IDynamicListMenuProps<TValue>> {
    public render(): JSX.Element {
        return (
            <div className="tas-dynamic-list-menu">
                {this.renderAddButton()}

                <ActionButton
                    iconProps={{ iconName: 'Remove' }}
                    text="Remove"
                    disabled={!this.props.showRemoveButton}
                    onClick={(): void => this.props.onRemoveClicked()}
                />
            </div>
        );
    }

    private renderAddButton(): JSX.Element {
        const addOptions = this.getItems();
        const commonProps = { iconProps: { iconName: 'Add' }, text: 'Insert' };

        if (!addOptions?.items || addOptions.items.length <= 0) return <PrimaryButton {...commonProps} disabled />;
        else if (addOptions.items.length === 1) {
            return (
                <CommandButton
                    {...commonProps}
                    disabled={false}
                    onClick={(): void => {
                        addOptions.items[0].onClick();
                    }}
                />
            );
        } else return <CommandButton {...commonProps} menuProps={addOptions} disabled={false} />;
    }

    private getItems(): IContextualMenuProps {
        return {
            items: this.props.options.map(
                (option, index): IContextualMenuItem => {
                    return {
                        key: index.toString(),
                        iconProps: { iconName: option.icon },
                        name: option.name,
                        onClick: (): void => this.props.onAddClicked(option.createInput())
                    };
                }
            )
        };
    }
}
