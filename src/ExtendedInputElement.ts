import * as React from 'react';
import { IChangingInputElement } from './IChangingInputElement';
import { IHidingInputElement } from './IHidingInputElement';
import { UpdateCallback } from './IInputElement';
import { ILoadingInputElement } from './ILoadingInputElement';
import { InputElement } from './InputElement';
import { IPresentation } from './Presentations';

export abstract class ExtendedInputElement<TValue, TPresentation extends IPresentation> extends InputElement
    implements IHidingInputElement, ILoadingInputElement, IChangingInputElement<TValue> {
    protected initialValue: TValue;
    protected _valueIsSet = false;
    protected _initialValueIsSet = false;
    protected _componentRef: React.RefObject<TPresentation>;

    private _isVisible = true;
    private _isLoading = false;

    protected constructor(update: UpdateCallback) {
        super(update);

        this._componentRef = React.createRef();
    }

    /** @inheritdoc */
    public setInitialValue(value: TValue): void {
        if (this._valueIsSet || this._initialValueIsSet) return;

        this._initialValueIsSet = true;
        this.initialValue = value;

        this.setInternalValue(value, true);
        this.updateInternally();
    }

    /** @inheritdoc */
    public setValue(value: TValue): void {
        this._valueIsSet = true;

        this.setInternalValue(value, false);
        this.updateInternally();
    }

    /** @inheritdoc */
    public resetValue(): void {
        if (!this._valueIsSet) return;

        this.setInternalValue(undefined, false);
        this.updateInternally();
    }

    protected abstract setInternalValue(value: TValue, isInitial: boolean): void;

    /** @inheritdoc */
    public get isVisible(): boolean {
        return this._isVisible;
    }

    /** @inheritdoc */
    public hide(): void {
        this._isVisible = false;

        if (this._componentRef?.current) this._componentRef.current.hide();
        this.updateInternally();
    }

    /** @inheritdoc */
    public show(): void {
        this._isVisible = true;

        if (this._componentRef?.current) this._componentRef.current.show();
        this.updateInternally();
    }

    /** @inheritdoc */
    public get isLoading(): boolean {
        return this._isLoading;
    }

    /** @inheritdoc */
    public load(action: (doneCallback: () => void) => void): void {
        if (!action) return;

        const callback = (): void => {
            this._isLoading = false;
            if (this._componentRef?.current) this._componentRef.current.stopLoading();
            this.updateInternally();
        };

        try {
            // If a new value is provided, we should execute asynchronously the `onDependentValueChanged` callback to retrieve the requested selectable models.
            this._isLoading = true;
            if (this._componentRef?.current) this._componentRef.current.startLoading();
            this.updateInternally();

            action(callback);
        } catch (error) {
            let newErrorMessage: string;

            if (error instanceof Error) newErrorMessage = error.message;
            if (typeof error === 'string') newErrorMessage = error;
            else throw error;

            this.errorMessage = newErrorMessage;
            callback();
        }
    }
}
