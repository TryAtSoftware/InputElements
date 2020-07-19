import IInputElementConfiguration from '../IInputElementConfiguration';
import ILoadingInputElementConfiguration from '../ILoadingInputElementConfiguration';

export default interface ISingleValueInputElementConfiguration
    extends IInputElementConfiguration,
        ILoadingInputElementConfiguration {
    /**
     * A value indicating whether error messages will be rendered by the underlying input element itself.
     * If it is set to false, no error message will be rendered but the validation pipeline will not be changed at all.
     */
    renderErrors?: boolean;

    /**
     * A value indicating whether the underlying component should render an appropriate indicator if it is required (and if the component itself is capable of doing this).
     * If it is set to false, no required indicator will be rendered but the validation pipeline will not be changed at all.
     */
    renderRequiredIndicator?: boolean;

    /**
     * A value indicating whether the input element should be validated even if it is not required and empty.
     */
    executeAllValidations?: boolean;
}
