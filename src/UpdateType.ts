/** This enum should define all possible values and reasons that may cause the update of an input element. */
enum UpdateType {
    /** This value describes the behavior when a new value has been acquired for the input element and the form should be refreshed in order to visualize it. */
    NewValue,

    /** This should be used for the initial render of the component (usually after calling the `setInitialValue` method). */
    Initial,

    /**
     * This value should be used for all circumstances that are not related to the input element's value, but required update.
     * You can receive such value after hiding or showing an input element for example.
     */
    System
}

export default UpdateType;
