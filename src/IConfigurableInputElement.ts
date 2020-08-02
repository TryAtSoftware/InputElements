import { IInputElementConfiguration } from './IInputElementConfiguration';

export interface IConfigurableInputElement<TConfiguration extends IInputElementConfiguration> {
    /**
     * The configuration that should be used for that input element.
     */
    configuration: TConfiguration;
}
