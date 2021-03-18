import * as React from 'react';
import { IInputElementPresentation, InputElementPresentationType } from '../IInputElementPresentation';
import { ParametrizedConstructor } from '../../Utilities/TypingHelper';

interface ICommonInputElementState {
    isLoading: boolean;
}

export interface ICommonInputBehaviorConfiguration {
    renderLoadingIndicator(): JSX.Element;
}

export function withCommonInputBehavior<TValue, TProps>(
    InternalComponent: React.ComponentType<TProps>,
    configuration: ICommonInputBehaviorConfiguration
): ParametrizedConstructor<unknown, InputElementPresentationType<TValue, TProps>> {
    return class CommonInputElement extends React.Component<TProps, ICommonInputElementState> implements IInputElementPresentation<TValue> {
        private readonly _internalComponentRef: React.RefObject<IInputElementPresentation<TValue>>;

        public constructor(props: TProps) {
            super(props);

            this._internalComponentRef = React.createRef<IInputElementPresentation<TValue>>();
        }

        public state: ICommonInputElementState = {
            isLoading: false
        };

        public startLoading = (): void => {
            if (this.state.isLoading) return;

            this.setState({ isLoading: true });
        };

        public stopLoading = (): void => {
            if (!this.state.isLoading) return;

            this.setState({ isLoading: false });
        };

        public update = (newValue: TValue): void => {
            this._internalComponentRef.current.update(newValue);
        };

        public render = (): JSX.Element => {
            if (!InternalComponent) return null;

            if (this.state.isLoading) {
                if (!configuration?.renderLoadingIndicator) return null;
                return configuration.renderLoadingIndicator();
            }

            return <InternalComponent {...this.props} ref={this._internalComponentRef} />;
        };
    };
}
