import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import * as React from 'react';

interface IPresentationRendererProps {
    isVisible: boolean;
    isLoading: boolean;
    renderLoadingIndicator?: () => JSX.Element;
    renderInternalContent: () => JSX.Element;
}

export class PresentationRenderer extends React.Component<IPresentationRendererProps> {
    public render(): JSX.Element {
        if (!this.props?.isVisible) return null;

        if (this.props.isLoading) {
            if (this.props.renderLoadingIndicator) return this.props.renderLoadingIndicator();

            return <Spinner size={SpinnerSize.medium} />;
        }

        if (!this.props.renderInternalContent) return null;
        return this.props.renderInternalContent();
    }
}
