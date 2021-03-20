import * as React from 'react';

export interface IInputElementPresentation<TValue> {
    startLoading(): void;
    stopLoading(): void;
    hide(): void;
    show(): void;
    update(newValue: TValue): void;
}

export type InputElementPresentationType<TValue, TProps> = React.Component<TProps> & IInputElementPresentation<TValue>;
