import * as React from 'react';
import { IChangingPresentation, IPresentation, IRestrictedPresentation, PresentationRenderer } from '../../Presentations';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';

interface ISingleValueInputElementWrapperState<TValue> {
    value: TValue;
    errorMessage: string;
    isLoading: boolean;
    isVisible: boolean;
}

export interface ISingleValueInputElementWrapperProps<TValue, TComponentProps extends ISingleValueInputElementProps<TValue>> {
    internalComponent: React.ComponentType<TComponentProps>;
    componentProps: TComponentProps;
    // renderProps: TRenderProps;
    isInitiallyLoading: boolean;
    isInitiallyVisible: boolean;
    renderLoadingIndicator(): JSX.Element;
}

export class SingleValueInputElementWrapper<TValue, TComponentProps extends ISingleValueInputElementProps<TValue>>
    extends React.Component<ISingleValueInputElementWrapperProps<TValue, TComponentProps>, ISingleValueInputElementWrapperState<TValue>>
    implements IPresentation, IChangingPresentation<TValue>, IRestrictedPresentation {
    public constructor(props: ISingleValueInputElementWrapperProps<TValue, TComponentProps>) {
        super(props);

        this.state = {
            isLoading: props.isInitiallyLoading,
            isVisible: props.isInitiallyVisible,
            errorMessage: props.componentProps?.errorMessage,
            value: props.componentProps?.value
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

    public hide = (): void => {
        if (!this.state.isVisible) return;

        this.setState({ isVisible: false });
    };

    public show = (): void => {
        if (this.state.isVisible) return;

        this.setState({ isVisible: true });
    };

    public update = (newValue: TValue): void => {
        this.setState({ value: newValue });
    };

    public setError = (errorMessage: string): void => {
        this.setState({ errorMessage: errorMessage });
    };

    public render = (): JSX.Element => {
        return (
            <PresentationRenderer
                isVisible={this.state.isVisible}
                isLoading={this.state.isLoading}
                renderInternalContent={this.renderInternalContent}
                renderLoadingIndicator={this.props.renderLoadingIndicator}
            />
        );
    };

    private renderInternalContent = (): JSX.Element => {
        const { internalComponent: Component, componentProps } = this.props;
        if (!Component) return null;

        return <Component {...componentProps} value={this.state.value} errorMessage={this.state.errorMessage} />;
    };
}
