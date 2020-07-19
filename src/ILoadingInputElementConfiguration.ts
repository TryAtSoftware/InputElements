export default interface ILoadingInputElementConfiguration {
    /**
     * This function can be used to customize the default loading UI of any loading input element.
     */
    renderLoadingComponent?: () => JSX.Element;
}
