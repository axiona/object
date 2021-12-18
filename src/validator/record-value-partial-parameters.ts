import Validator from "@dikac/t-validator/validator";
import Validatable from "@dikac/t-validatable/validatable";
import ReturnInfer from "@dikac/t-validator/validatable/infer-static";
import ValidateMap from "./validatable/record/record-value-partial-parameters";
import RecordValue from "./record-value";
import RecordValueCallback from "./record-value-callback-parameters";


export default function RecordValuePartialParameters<
    ValidatorType extends Validator = Validator,
    ValidatableType extends Validatable = Validatable,
    MessageType = unknown,
> (
    validator : ValidatorType,
    validation : (record : Record<PropertyKey, ReturnInfer<ValidatorType>>)=>ValidatableType,
    message : (record : Record<PropertyKey, ReturnInfer<ValidatorType>>)=>MessageType,
) : RecordValue<ValidatorType, Partial<Record<PropertyKey, ReturnInfer<ValidatorType>>>, ValidatableType, MessageType>  {

    return RecordValueCallback(
        validator,
        ValidateMap,
        validation,
        message
    ) as RecordValue<ValidatorType, Partial<Record<PropertyKey, ReturnInfer<ValidatorType>>>, ValidatableType, MessageType>;
}