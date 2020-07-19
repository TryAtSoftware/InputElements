import IInputElementConfiguration from './IInputElementConfiguration';

export default interface IConfigurableInputElement<TConfiguration extends IInputElementConfiguration> {
    /**
     * The configuration that should be used for that input element.
     */
    configuration: TConfiguration;
}
