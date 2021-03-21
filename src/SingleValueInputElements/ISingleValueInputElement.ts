import * as React from 'react';
import { IChangingInputElement } from '../IChangingInputElement';
import { IHidingInputElement } from '../IHidingInputElement';
import { ILoadingInputElement } from '../ILoadingInputElement';
import { IValueInputElement } from '../IValueInputElement';
import { ISingleValueInputElementProps } from './ISingleValueInputElementProps';

export interface ISingleValueInputElement<TValue, TComponentProps = unknown, TRenderData = never>
    extends IValueInputElement<TValue, TRenderData>,
        IChangingInputElement<TValue, TRenderData>,
        IHidingInputElement<TRenderData>,
        ILoadingInputElement<TRenderData> {
    /**
     * A component containing the front-end part of the input element (all that is visible to the end user).
     * It should accept all necessary props for realizing the communication between the visual and the logical part of the input element.
     * It may also accept other props of type 'TComponentProps' stored in the 'componentProps' property.
     *
     * @see React.Component
     */
    readonly componentToRender: React.ComponentType<ISingleValueInputElementProps<TValue> & TComponentProps & TRenderData>;

    /**
     * A property containing all additional props that the rendered component needs.
     * They should be initialized before the 'render' method is ever called (the best way of doing that is by passing them into the constructor).
     */
    readonly componentProps: TComponentProps;
}
