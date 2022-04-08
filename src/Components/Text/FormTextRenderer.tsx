import * as React from 'react';
import { FormText } from './Types';

interface IFormTextRendererProps {
    text: FormText;
}

const FormTextRendererComponent = (props: IFormTextRendererProps): JSX.Element => {
    const { text: TextValue } = props;
    if (!TextValue) return null;

    if (typeof TextValue === 'string') return <>{TextValue}</>;
    return <TextValue />;
};

export const FormTextRenderer = React.memo(FormTextRendererComponent);

export function materializeErrorMessage(error: FormText): JSX.Element {
    if (!error) return null;
    return <FormTextRenderer text={error} />;
}
