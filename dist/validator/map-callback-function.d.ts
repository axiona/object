import Validator from "@dikac/t-validator/simple";
import Validatable from "@dikac/t-validatable/validatable";
import RecordParameter from "./base/record/infer";
import Instance from "@dikac/t-validator/validatable/validatable";
import Map from "./map";
export default function MapCallbackFunction<Container extends Record<PropertyKey, Validator> = Record<PropertyKey, Validator>, Result extends Record<PropertyKey, Instance> = Record<PropertyKey, Instance>, ValidatableType extends Validatable = Validatable, MessageType = unknown>(validators: Container, map: (argument: RecordParameter<Container>, validators: Container) => Result, validation: (result: Result) => ValidatableType, message: (result: Result) => MessageType): Map<Container, Result, ValidatableType, MessageType>;
