import * as React from 'react';
import { DefaultButton } from '@fluentui/react';

interface IClearButtonProps {
    className?: string;
    isDisabled?: boolean;
    onClick: () => void;
}

export class ClearButton extends React.Component<IClearButtonProps> {
    public render(): JSX.Element {
        const { className, isDisabled, onClick } = this.props;
        return <DefaultButton className={className} disabled={isDisabled} iconProps={{ iconName: 'Clear' }} onClick={onClick} />;
    }
}
