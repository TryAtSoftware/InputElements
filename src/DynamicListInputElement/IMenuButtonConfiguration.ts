import IBasicMenuButtonConfiguration from './IBasicMenuButtonConfiguration';

export default interface IMenuButtonConfiguration extends IBasicMenuButtonConfiguration {
    className?: string;
    label?: string;
    iconName?: string;
    show?: boolean;
    isEnabled?: boolean;
}
