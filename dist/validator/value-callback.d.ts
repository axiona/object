import Validator from "@dikac/t-validator/validator";
import ValidatableInterface from "@dikac/t-validatable/validatable";
import Function from "@dikac/t-function/function";
import ValueInterface from "@dikac/t-value/value";
import RecordValidatable from "./return/record/record";
import OptionalValidatable from "./return/record/partial";
import ValueCallback from "../validatable/value-callback";
import Message from "@dikac/t-message/message";
export declare type ValidationReturn<Val, Container extends Record<PropertyKey, Validator<Val>>> = RecordValidatable<Container> | OptionalValidatable<Container>;
export declare type ValidatorReturn<Val, MessageT = unknown, Container extends Record<PropertyKey, Validator<Val>> = Record<PropertyKey, Validator<Val>>, Result extends Record<PropertyKey, ValidatableInterface & Message> = Record<PropertyKey, ValidatableInterface & Message>, Validatable extends ValidatableInterface = ValidatableInterface> = ValueInterface<Val> & ValidatableInterface & {
    validatables: Result;
} & {
    validatable: Validatable;
};
export default class ValueCallbackz<Val = unknown, MessageT = unknown, Container extends Record<PropertyKey, Validator<Val>> = Record<PropertyKey, Validator<Val>>, Result extends Record<PropertyKey, ValidatableInterface & Message> = Record<PropertyKey, ValidatableInterface & Message>, Validatable extends ValidatableInterface = ValidatableInterface> implements Validator<Val, ValueCallback<Val, MessageT, Container, Result, Validatable>> {
    validators: Container;
    handler: Function<[Val, Container], Result>;
    validation: Function<[Result], Validatable>;
    message: Function<[Result], MessageT>;
    constructor(validators: Container, handler: Function<[Val, Container], Result>, validation: Function<[Result], Validatable>, message: Function<[Result], MessageT>);
    validate(argument: Val): ValueCallback<Val, MessageT, Container, Result, Validatable>;
}
