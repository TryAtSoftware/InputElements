import { Spinner, SpinnerSize } from '@fluentui/react';
import * as React from 'react';

interface IPresentationRendererProps {
    isVisible: boolean;
    isLoading: boolean;
    loadingIndicator?: React.ComponentType;
    renderInternalContent: () => JSX.Element;
}

export class PresentationRenderer extends React.Component<IPresentationRendererProps> {
    public render(): JSX.Element {
        const { isVisible } = this.props;
        if (!isVisible) return null;

        const { isLoading } = this.props;
        if (isLoading) {
            const { loadingIndicator: LoadingIndicator } = this.props;
            if (LoadingIndicator) return <LoadingIndicator />;

            return <Spinner size={SpinnerSize.medium} />;
        }

        const { renderInternalContent } = this.props;
        if (!renderInternalContent) return null;
        return renderInternalContent();
    }
}
