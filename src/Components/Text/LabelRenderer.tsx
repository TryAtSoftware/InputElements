import * as React from 'react';
import { Label } from '@fluentui/react';
import { FormTextRenderer } from './FormTextRenderer';
import { FormText } from './Types';

interface ILabelRendererProps {
    label: FormText;
    required: boolean;
}

const LabelRendererComponent = (props: ILabelRendererProps): JSX.Element => {
    if (!props) return null;

    const { label, required } = props;
    if (!label) return null;
    return (
        <Label required={required}>
            <FormTextRenderer text={label} />
        </Label>
    );
};

export const LabelRenderer = React.memo(LabelRendererComponent);
