import Validator from "@dikac/t-validator/validator";
import Validatable from "@dikac/t-validatable/validatable";
import RecordKey from "./record-key";
import ValidatorValidatable from "@dikac/t-validator/validatable/validatable";
import InferBase from "@dikac/t-validator/subject/allow";
import ValidatorContainer from "@dikac/t-validator/validator/validator";
import Message from "@dikac/t-message/message";
import Value from "@dikac/t-value/value";
import RecordKeyCallbackParameters from "./record-key-callback-parameters";

export type RecordKeyCallbackArgument<
    ValidatorType extends Validator<PropertyKey> = Validator<PropertyKey>,
    Result extends Partial<Record<PropertyKey, ValidatorValidatable>> = Partial<Record<PropertyKey, ValidatorValidatable>>,
    ValidatableType extends Validatable = Validatable,
    MessageType = unknown,
> =
    ValidatorContainer<ValidatorType> &
    Message<(result:Result)=>MessageType> &
    { handler: (argument : Value<Record<InferBase<ValidatorType>, any>> & ValidatorContainer<ValidatorType>) => Result } &
    { validation: (result: Result) => ValidatableType }
;

export default function RecordKeyCallbackParameter<
    ValidatorType extends Validator<PropertyKey> = Validator<PropertyKey>,
    Result extends Partial<Record<PropertyKey, ValidatorValidatable>> = Partial<Record<PropertyKey, ValidatorValidatable>>,
    ValidatableType extends Validatable = Validatable,
    MessageType = unknown,
>(
    {   validator,
        handler,
        validation,
        message
    } : RecordKeyCallbackArgument<ValidatorType, Result, ValidatableType, MessageType>
) : RecordKey<ValidatorType, Result, ValidatableType, MessageType> {

    return RecordKeyCallbackParameters(
        validator,
        (value, validator) => handler({value, validator}),
        validation,
        message
    );
}

