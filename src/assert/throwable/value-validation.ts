import PropertyValueValidationMessage from '../string/value-validation';
import Validatable from '@alirya/validatable/validatable';
import Property from '../../property/property/property';

export function ValueValidationParameters(
    property : PropertyKey,
    type : string,
    validation : string,
) : Error {

    return new Error(
        PropertyValueValidationMessage.Parameters(property, false, type, validation)
    );
}


export type ValueValidationArgument = Validatable & Property & {type : string} & { validation: string };

export function ValueValidationParameter(
    {
        property,
        type,
        validation,
    } : ValueValidationArgument
) : Error {

    return ValueValidationParameters(property, type, validation);
}


namespace ValueValidation {
    export const Parameters = ValueValidationParameters;
    export const Parameter = ValueValidationParameter;
    export type Argument = ValueValidationArgument;
}
export default ValueValidation;