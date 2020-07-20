import * as React from 'react';
import { CommandButton, IContextualMenuItem, IContextualMenuProps, PrimaryButton } from 'office-ui-fabric-react';
import { IDynamicListMenuProps } from './IDynamicListMenuProps';

export class DynamicListMenu<TValue> extends React.Component<IDynamicListMenuProps<TValue>> {
    public render(): JSX.Element {
        return (
            <div className="tas-dynamic-list-menu">
                {this.props?.insertButtonConfig?.show && this.renderInsertButton()}
                {this.props?.removeButtonConfig?.show && this.renderRemoveButton()}
            </div>
        );
    }

    private renderInsertButton(): JSX.Element {
        const addOptions = this.getItems();
        const commonProps = {
            iconProps: { iconName: this.props?.insertButtonConfig?.iconName || 'Add' },
            text: this.props?.insertButtonConfig?.label || 'Insert'
        };

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

    private renderRemoveButton(): JSX.Element {
        return (
            <CommandButton
                iconProps={{ iconName: this.props?.removeButtonConfig?.iconName || 'Remove' }}
                text={this.props?.removeButtonConfig?.label || 'Remove'}
                disabled={!this.props.removeButtonConfig?.isEnabled}
                onClick={(): void => !!this.props.onRemoveClicked && this.props.onRemoveClicked()}
            />
        );
    }

    private getItems(): IContextualMenuProps {
        return {
            items: this.props.options.map(
                (option, index): IContextualMenuItem => {
                    return {
                        key: index.toString(),
                        iconProps: { iconName: option.icon },
                        name: option.name,
                        onClick: (): void => !!this.props.onAddClicked && this.props.onAddClicked(option.createInput())
                    };
                }
            )
        };
    }
}
