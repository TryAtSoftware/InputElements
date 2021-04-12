import * as React from 'react';
import {
    IChangingPresentation,
    IDynamicPresentation,
    IPresentation,
    IRestrictedPresentation,
    PresentationRenderer
} from '../../Presentations';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';

interface ISingleValueInputElementWrapperState<TValue, TDynamicProps> {
    value: TValue;
    errorMessage: string;
    isLoading: boolean;
    isVisible: boolean;
    dynamicProps: TDynamicProps;
}

export interface ISingleValueInputElementWrapperProps<
    TValue,
    TComponentProps extends ISingleValueInputElementProps<TValue>,
    TDynamicProps
> {
    internalComponent: React.ComponentType<TComponentProps & TDynamicProps>;
    componentProps: TComponentProps;
    initialDynamicProps: TDynamicProps;
    isInitiallyLoading: boolean;
    isInitiallyVisible: boolean;

    renderLoadingIndicator(): JSX.Element;
}

export class SingleValueInputElementWrapper<TValue, TComponentProps extends ISingleValueInputElementProps<TValue>, TDynamicProps = unknown>
    extends React.Component<
        ISingleValueInputElementWrapperProps<TValue, TComponentProps, TDynamicProps>,
        ISingleValueInputElementWrapperState<TValue, TDynamicProps>
    >
    implements IPresentation, IChangingPresentation<TValue>, IRestrictedPresentation, IDynamicPresentation<TDynamicProps> {
    public constructor(props: ISingleValueInputElementWrapperProps<TValue, TComponentProps, TDynamicProps>) {
        super(props);

        this.state = {
            isLoading: props.isInitiallyLoading,
            isVisible: props.isInitiallyVisible,
            errorMessage: props.componentProps?.errorMessage,
            value: props.componentProps?.value,
            dynamicProps: props.initialDynamicProps
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

    public changeDynamicProps = (dynamicProps: TDynamicProps): void => {
        this.setState({ dynamicProps: dynamicProps });
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

        return (
            <Component {...this.state.dynamicProps} {...componentProps} value={this.state.value} errorMessage={this.state.errorMessage} />
        );
    };
}