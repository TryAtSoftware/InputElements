import * as React from 'react';
import { UpdateCallback } from '../IInputElement';
import { ValidationRule } from '../IValueInputElement';
import {
    IDynamicProps,
    IOperativeProps,
    ISingleValueInputElement,
    ISingleValueInputElementConfiguration,
    ISingleValueInputElementProps,
    SingleValueInputElement
} from '../SingleValueInputElements';

class InputElementBuilder<TValue> {
    private readonly _config: ISingleValueInputElementConfiguration<TValue>;
    private readonly _updateCallback: UpdateCallback;
    private readonly _validationRules: ValidationRule<TValue>[];

    constructor(
        config: ISingleValueInputElementConfiguration<TValue>,
        updateCallback: UpdateCallback,
        validationRules: ValidationRule<TValue>[]
    ) {
        this._config = config;
        this._updateCallback = updateCallback;
        this._validationRules = validationRules;
    }

    public materialize<TComponentProps, TDynamicProps>(
        component: React.ComponentType<
            ISingleValueInputElementProps<TValue> & IDynamicProps<TDynamicProps> & IOperativeProps<TComponentProps>
        >,
        props: TComponentProps
    ): ISingleValueInputElement<TValue, TComponentProps, TDynamicProps> {
        return new SingleValueInputElement<TValue, TComponentProps, TDynamicProps>(
            this._config,
            component,
            props,
            this._updateCallback,
            ...this._validationRules
        );
    }
}

export function prepareInputElement<TValue>(
    config: ISingleValueInputElementConfiguration<TValue>,
    updateCallback: UpdateCallback,
    ...validationRules: ValidationRule<TValue>[]
): InputElementBuilder<TValue> {
    return new InputElementBuilder(config, updateCallback, validationRules);
}
