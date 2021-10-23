import Validator from "@dikac/t-validator/validator";
import Validatable from "@dikac/t-validatable/validatable";
import RecordParameter from "./base/record/infer";
import Map from "./map";
import Instance from "@dikac/t-validator/validatable/validatable";
import ValidatorsContainer from "./validators/validators";
import Message from "@dikac/t-message/message";
export declare type Argument<Validators extends Record<PropertyKey, Validator> = Record<PropertyKey, Validator>, Result extends Partial<Record<PropertyKey, Instance>> = Partial<Record<PropertyKey, Instance>>, ValidatableType extends Validatable = Validatable, MessageType = unknown> = ValidatorsContainer<Validators> & Message<(result: Result) => MessageType> & {
    validation: (result: Result) => ValidatableType;
} & {
    map: (record: RecordParameter<Validators>, validators: Validators) => Result;
};
export default function MapCallback<Validators extends Record<PropertyKey, Validator> = Record<PropertyKey, Validator>, Result extends Partial<Record<PropertyKey, Instance>> = Partial<Record<PropertyKey, Instance>>, ValidatableType extends Validatable = Validatable, MessageType = unknown>({ validators, map, validation, message }: Argument<Validators, Result, ValidatableType, MessageType>): Map<Validators, Result, ValidatableType, MessageType>;
