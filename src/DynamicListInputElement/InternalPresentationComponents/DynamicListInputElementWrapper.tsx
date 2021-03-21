import * as React from 'react';
import { IChangingPresentation, PresentationRenderer } from '../../Presentations';
import { DynamicInputsList, IDynamicInputListProps } from '../DynamicInputsList';
import { IInputInformation } from '../DynamicListInputElement';

interface IDynamicListInputElementWrapperState<TValue> {
    isLoading: boolean;
    isVisible: boolean;
    inputElements: IInputInformation<TValue>[];
}

export interface ICommonInputBehaviorConfiguration {
    renderLoadingIndicator(): JSX.Element;
}

export class DynamicListInputElementWrapper<TValue>
    extends React.Component<
        IDynamicInputListProps<TValue> & ICommonInputBehaviorConfiguration,
        IDynamicListInputElementWrapperState<TValue>
    >
    implements IChangingPresentation<IInputInformation<TValue>[]> {
    public constructor(props: IDynamicInputListProps<TValue> & ICommonInputBehaviorConfiguration) {
        super(props);

        this.state = {
            isLoading: false,
            isVisible: true,
            inputElements: props.inputs ?? []
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

    public update = (newValue: IInputInformation<TValue>[]): void => {
        this.setState({ inputElements: newValue });
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
        return <DynamicInputsList {...this.props} inputs={this.state.inputElements} />;
    };
}
