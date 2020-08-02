import { ExtendedInputElement } from './ExtendedInputElement';
import { IConfigurableInputElement } from './IConfigurableInputElement';
import { IInputElementConfiguration } from './IInputElementConfiguration';
import { ILoadingInputElementConfiguration } from './ILoadingInputElementConfiguration';
import { UpdateCallback } from './IInputElement';

export abstract class ExtendedConfigurableInputElement<
    TConfiguration extends IInputElementConfiguration & ILoadingInputElementConfiguration,
    TChangeValue
> extends ExtendedInputElement<TChangeValue> implements IConfigurableInputElement<TConfiguration> {
    protected constructor(configuration: TConfiguration, update: UpdateCallback) {
        super(update);

        this.configuration = configuration;
    }

    /** @inheritdoc */
    public configuration: TConfiguration;
}
