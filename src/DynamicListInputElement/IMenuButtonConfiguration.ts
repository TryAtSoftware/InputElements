import { IBasicMenuButtonConfiguration } from './IBasicMenuButtonConfiguration';

export interface IMenuButtonConfiguration extends IBasicMenuButtonConfiguration {
    className?: string;
    label?: string;
    iconName?: string;
    show?: boolean;
    isEnabled?: boolean;
}
