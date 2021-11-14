import Validator from "@dikac/t-validator/validator";
import Validatable from "@dikac/t-validatable/validatable";
import Instance from "@dikac/t-validator/validatable/dynamic";
import Value from "./value";
import BaseValue from "@dikac/t-value/value";
import ValidatorsContainer from "./validators/validators";
import Message from "@dikac/t-message/message";
/**
 * Base implementation of {@link Value}
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
 * @template ValidatorsType
 * record of {@link Validator} to be used against {@template BaseType} or {@template ValueType}
 *
 * @template Validatables
 * result after processing {@template ValidatorsType} with {@template BaseType} or {@template ValueType}
 *
 * @template ValidatableType
 * final result after processing {@template Validatables}
 */
export declare type ValueCallbackArgument<BaseType = unknown, ValueType extends BaseType = BaseType, MessageType = unknown, ValidatorsType extends Record<PropertyKey, Validator<BaseType, ValueType>> = Record<PropertyKey, Validator<BaseType, ValueType>>, Validatables extends Partial<Record<PropertyKey, Instance>> = Partial<Record<PropertyKey, Instance>>, ValidatableType extends Validatable = Validatable> = ValidatorsContainer<ValidatorsType> & {
    map: (argument: BaseValue<BaseType> & ValidatorsContainer<ValidatorsType>) => Validatables;
} & {
    validation: (result: Validatables) => ValidatableType;
} & Message<(result: Validatables) => MessageType>;
export default function ValueCallbackParameter<BaseType = unknown, ValueType extends BaseType = BaseType, MessageType = unknown, ValidatorsType extends Record<PropertyKey, Validator<BaseType, ValueType>> = Record<PropertyKey, Validator<BaseType, ValueType>>, Validatables extends Partial<Record<PropertyKey, Instance>> = Partial<Record<PropertyKey, Instance>>, ValidatableType extends Validatable = Validatable>({ validators, map, validation, message, }: ValueCallbackArgument<BaseType, ValueType, MessageType, ValidatorsType, Validatables, ValidatableType>): Value<BaseType, ValueType, MessageType, ValidatorsType, Validatables, ValidatableType>;
