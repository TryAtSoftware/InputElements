import {
    DropdownInput,
    DropdownInputElement,
    IBaseInputElementProps,
    IDropdownInputProps,
    IDropdownInputOption,
    ISingleValueInputElement,
    ITextInputProps,
    SingleValueInputElement,
    TextInput,
    UpdateCallback,
    restrictMaximumLength,
    restrictValidPath
} from '@try-at-software/input-elements';

export function createDropdown(updateForm: UpdateCallback): () => ISingleValueInputElement<string> {
    return (): ISingleValueInputElement<string> => {
        const options: string[] = [];

        for (let i = 0; i < 15; i++) options.push(i.toString());

        const dropdownInput = new DropdownInputElement<IBaseInputElementProps, IDropdownInputProps>(
            { isRequired: true, renderRequiredIndicator: true, renderErrors: true },
            DropdownInput,
            { placeholder: 'Choose any value' },
            updateForm
        );

        dropdownInput.changeDynamicProps({
            options: options.map(
                (o): IDropdownInputOption => {
                    return { key: o, text: o };
                }
            )
        });

        return dropdownInput;
    };
}

export function createTextField(updateForm: UpdateCallback): () => ISingleValueInputElement<string> {
    return (): ISingleValueInputElement<string> => {
        return new SingleValueInputElement<string, ITextInputProps>(
            { isRequired: true, renderRequiredIndicator: true, renderErrors: true },
            TextInput,
            { placeholder: 'Write any value' },
            updateForm,
            restrictMaximumLength(256),
            restrictValidPath()
        );
    };
}
