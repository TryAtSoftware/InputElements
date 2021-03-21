import { UpdateCallback } from '../../IInputElement';
import { ValidationRule } from '../../IValueInputElement';
import { IBaseInputElementProps } from '../IBaseInputElementProps';
import { ISingleValueInputElementConfiguration } from '../ISingleInputElementConfiguration';
import { SingleValueInputElement } from '../SingleValueInputElement';
import { DropdownInput } from './DropdownInput';
import { IDropdownInputOption } from './IDropdownInputOption';
import { IDropdownInputProps } from './IDropdownInputProps';

export class DropdownInputElement extends SingleValueInputElement<string, IBaseInputElementProps, IDropdownInputProps> {
    constructor(
        config: ISingleValueInputElementConfiguration<string>,
        props: IBaseInputElementProps,
        update: UpdateCallback,
        ...validationRules: ValidationRule<string>[]
    ) {
        super(config, DropdownInput, props, update, ...validationRules);

        this.validationRules.push(this.getConsistencyValidationRule());
    }

    private static consistencyErrorMessage = 'The value is not present within the specified options.';

    private getConsistencyValidationRule(): ValidationRule<string> {
        return (newValue: string): string => {
            const dynamicProps = this.getDynamicProps();
            if (!dynamicProps) return DropdownInputElement.consistencyErrorMessage;

            const allOptions: IDropdownInputOption[] = [];
            if (dynamicProps.defaultOption) allOptions.push(dynamicProps.defaultOption);

            if (dynamicProps.options && Array.isArray(dynamicProps.options)) {
                dynamicProps.options.forEach((o): void => {
                    if (!o) return;
                    allOptions.push(o);
                });
            }

            if (allOptions.some((o): boolean => o.key === newValue)) return null;
            return DropdownInputElement.consistencyErrorMessage;
        };
    }
}
