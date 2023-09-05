import * as React from 'react';
import { FormText } from '../../Components';
import {
    IChangingPresentation,
    IDynamicPresentation,
    IPresentation,
    IRestrictedPresentation,
    PresentationRenderer
} from '../../Presentations';
import { IDynamicProps } from '../IDynamicProps';
import { IOperativeProps } from '../IOperativeProps';
import { ISingleValueInputElementProps } from '../ISingleValueInputElementProps';

interface ISingleValueInputElementWrapperState<TValue, TDynamicProps> {
    value: TValue;
    errorMessage: FormText;
    isLoading: boolean;
    isVisible: boolean;
    dynamicProps: TDynamicProps;
}

export interface ISingleValueInputElementWrapperProps<TValue, TComponentProps, TDynamicProps> {
    internalComponent: React.ComponentType<
        ISingleValueInputElementProps<TValue> & IOperativeProps<TComponentProps> & IDynamicProps<TDynamicProps>
    >;
    inputProps: ISingleValueInputElementProps<TValue>;
    operativeProps: TComponentProps;
    initialDynamicProps: TDynamicProps;
    isInitiallyLoading: boolean;
    isInitiallyVisible: boolean;

    loadingIndicator: React.ComponentType;

    renderErrors: boolean;
}

export class SingleValueInputElementWrapper<TValue, TComponentProps, TDynamicProps>
    extends React.Component<
        ISingleValueInputElementWrapperProps<TValue, TComponentProps, TDynamicProps>,
        ISingleValueInputElementWrapperState<TValue, TDynamicProps>
    >
    implements IPresentation, IChangingPresentation<TValue>, IRestrictedPresentation, IDynamicPresentation<TDynamicProps>
{
    public constructor(
        props: ISingleValueInputElementWrapperProps<TValue, ISingleValueInputElementProps<TValue> & TComponentProps, TDynamicProps>
    ) {
        super(props);

        this.state = {
            isLoading: props.isInitiallyLoading,
            isVisible: props.isInitiallyVisible,
            errorMessage: props.inputProps?.errorMessage,
            value: props.inputProps?.value,
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

    public setError = (errorMessage: FormText): void => {
        this.setState({ errorMessage: errorMessage });
    };

    public changeDynamicProps = (dynamicProps: TDynamicProps): void => {
        this.setState({ dynamicProps: dynamicProps });
    };

    public render = (): JSX.Element => {
        const { isVisible, isLoading } = this.state;
        const { loadingIndicator } = this.props;

        return (
            <PresentationRenderer
                isVisible={isVisible}
                isLoading={isLoading}
                renderInternalContent={this.renderInternalContent}
                loadingIndicator={loadingIndicator}
            />
        );
    };

    private renderInternalContent = (): JSX.Element => {
        const { internalComponent: Component, inputProps, operativeProps } = this.props;
        if (!Component) return null;

        const { renderErrors } = this.props;
        const errorMessages = renderErrors ? this.state.errorMessage : null;
        return (
            <Component
                dynamicProps={this.state.dynamicProps ?? {}}
                operativeProps={operativeProps}
                {...inputProps}
                value={this.state.value}
                errorMessage={errorMessages}
            />
        );
    };
}
