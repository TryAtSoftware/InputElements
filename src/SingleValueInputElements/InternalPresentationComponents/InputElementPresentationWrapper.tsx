import * as React from 'react';
import { IInputElementPresentation, InputElementPresentationType } from '../IInputElementPresentation';
import { ParametrizedConstructor } from '../../Utilities';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';

interface ICommonInputElementState<TValue> {
    value: TValue;
    isLoading: boolean;
}

export interface ICommonInputBehaviorConfiguration {
    renderLoadingIndicator(): JSX.Element;
}

export function withCommonInputBehavior<TValue, TProps extends ISingleValueInputElementProps<TValue>>(
    InternalComponent: React.ComponentType<TProps>,
    configuration: ICommonInputBehaviorConfiguration
): ParametrizedConstructor<unknown, InputElementPresentationType<TValue, TProps>> {
    return class CommonInputElement extends React.Component<TProps, ICommonInputElementState<TValue>>
        implements IInputElementPresentation<TValue> {
        public constructor(props: TProps) {
            super(props);

            this.state = {
                isLoading: false,
                value: props.value
            };
        }

        public startLoading = (): void => {
            if (this.state.isLoading) return;

            this.setState({ isLoading: true });
        };

        public stopLoading = (): void => {
            if (!this.state.isLoading) return;

            this.setState({ isLoading: false });
        };

        public update = (newValue: TValue): void => {
            this.setState({ value: newValue });
        };

        public render = (): JSX.Element => {
            if (!InternalComponent) return null;

            if (this.state.isLoading) {
                if (!configuration?.renderLoadingIndicator) return null;
                return configuration.renderLoadingIndicator();
            }

            return <InternalComponent {...this.props} value={this.state.value} />;
        };
    };
}
