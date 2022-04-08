import * as React from 'react';
import { CommandButton, IContextualMenuItem, IContextualMenuProps, PrimaryButton } from '@fluentui/react';
import { FormTextRenderer } from '../../Components';
import { IDynamicListMenuProps } from './IDynamicListMenuProps';

export class DynamicListMenu<TValue> extends React.Component<IDynamicListMenuProps<TValue>> {
    public render(): JSX.Element {
        if (!this.props) return null;

        return (
            <div className="tas-dynamic-list-menu">
                {this.props.insertButtonConfig?.show && this.renderInsertButton()}
                {this.props.removeButtonConfig?.show && this.renderRemoveButton()}
            </div>
        );
    }

    private renderInsertButton(): JSX.Element {
        const addOptions = this.getItems();
        const buttonText = this.props.insertButtonConfig?.label || 'Insert';
        const commonProps = {
            iconProps: { iconName: this.props.insertButtonConfig?.iconName || 'Add' },
            children: <FormTextRenderer text={buttonText} />
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
        const buttonText = this.props.removeButtonConfig?.label || 'Remove';
        return (
            <CommandButton
                iconProps={{ iconName: this.props.removeButtonConfig?.iconName || 'Remove' }}
                disabled={!this.props.removeButtonConfig?.isEnabled}
                onClick={(): void => !!this.props.onRemoveClicked && this.props.onRemoveClicked()}
            >
                <FormTextRenderer text={buttonText} />
            </CommandButton>
        );
    }

    private getItems(): IContextualMenuProps {
        return {
            items: this.props.options.map((option, index): IContextualMenuItem => {
                return {
                    key: index.toString(),
                    iconProps: { iconName: option.icon },
                    name: option.name,
                    onClick: (): void => !!this.props.onAddClicked && this.props.onAddClicked(option.createInput())
                };
            })
        };
    }
}
