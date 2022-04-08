import { MessageBar, MessageBarType } from '@fluentui/react';
import * as React from 'react';
import { FormTextRenderer } from './FormTextRenderer';
import { FormText } from './Types';

interface IErrorRendererProps {
    error: FormText;
    messageBarType: MessageBarType;
}

const ErrorRendererComponent = (props: IErrorRendererProps): JSX.Element => {
    const { error } = props;
    if (!error) return null;

    return (
        <MessageBar messageBarType={MessageBarType.warning}>
            <FormTextRenderer text={error} />
        </MessageBar>
    );
};

export const ErrorRenderer = React.memo(ErrorRendererComponent);
