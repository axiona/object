import Validator from "@dikac/t-validator/simple";
import Validatable from "@dikac/t-validatable/validatable";
import ValidateValue from "./validatable/record/value-parameters";
import MapReturn from "./validatable/record/infer";
import ValueCallback from "./value-callback-parameters";
import ValueInterface from "./value";

/**
 * more specific implementation of {@link ValueCallback}
 *
 * Validate value with all record of {@link Validator}
 *
 * @param validators
 * record of {@link Validator} to be used against {@template BaseType} or {@template ValueType}
 *
 * @param validation
 *
 * @param message
 *
 * @template BaseType
 * Base value type for all {@link Validator}
 *
 * @template ValueType
 * value type {@link Validator}
 *
 * @template MessageType
 * message type {@link Validator}
 *
 * @template Validators
 * type of {@param validators}
 *
 * @template ValidatableType
 * result after processing {@template Validators} with {@template BaseType} or {@template ValueType}
 */
export default function ValueAllParameters<
    Base = unknown,
    Value extends Base = Base,
    MessageType = unknown,
    Validators extends Record<PropertyKey, Validator<Base, Value>> = Record<PropertyKey, Validator<Base, Value>>,
    ValidatableType extends Validatable = Validatable
>(
    validators : Validators,
    validation : (result:MapReturn<Validators>) => ValidatableType,
    message : (result:MapReturn<Validators>) => MessageType,
) : ValueInterface<Base, Value, MessageType, Validators, MapReturn<Validators>, ValidatableType> {

    return ValueCallback(
        validators,
        ValidateValue,
        validation,
        message
    ) as ValueInterface<Base, Value, MessageType, Validators, MapReturn<Validators>, ValidatableType>;
}
