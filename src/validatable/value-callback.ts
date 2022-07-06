import Validator from '@alirya/validator/validator.js';
import ValidatorValidatable from '@alirya/validator/validatable/validatable.js';
import Validatable from '@alirya/validatable/validatable.js';
import Value from './value.js';
import MemoizeAccessor from '../function/memoize-accessor.js';
import BaseValue from '@alirya/value/value.js';
import Validators from '../validator/validators/validators.js';
import Message from '@alirya/message/message.js';

export class ValueCallbackParameters<
    ValueType = unknown,
    MessageType = unknown,
    RecordType extends Record<PropertyKey, Validator<ValueType>> = Record<PropertyKey, Validator<ValueType>>,
    Result extends Partial<Record<PropertyKey, ValidatorValidatable>> = Partial<Record<PropertyKey, ValidatorValidatable>>,
    ValidatableType extends Validatable = Validatable
> implements Value<ValueType, MessageType, RecordType, Result, ValidatableType> {

    #message : (result:Result)=>MessageType;
    readonly validatable : ValidatableType;
    readonly validatables : Result;

    constructor(
        readonly value: ValueType,
        readonly validators : RecordType,
        readonly map : (value:ValueType, validators:RecordType)=>Result,
        readonly validation : (result:Result)=>ValidatableType,
        message : (result:Result)=>MessageType,
    ) {

        this.value = value;
        this.#message = message;
        this.validatables = map(value, validators);
        this.validatable = validation(this.validatables);
    }

    get valid() : boolean {

        return this.validatable.valid;
    }

    get messages() : Result {

        return this.validatables;
    }

    @MemoizeAccessor()
    get message() : MessageType {

        try {

            return this.#message(this.validatables);

        } catch (e) {

            throw new Error(`error on generating message, ${e}`);
        }

    }
}


export type ValueCallbackArgument<
    ValueType = unknown,
    MessageType = unknown,
    RecordType extends Record<PropertyKey, Validator<ValueType>> = Record<PropertyKey, Validator<ValueType>>,
    Result extends Partial<Record<PropertyKey, ValidatorValidatable>> = Partial<Record<PropertyKey, ValidatorValidatable>>,
    ValidatableType extends Validatable = Validatable
> =
    BaseValue<ValueType> &
    Validators<RecordType> &
    {map : (argument:BaseValue<ValueType> & Validators<RecordType>)=>Result} &
    // TODO CHANGE TO VALIDATOR
    {validation: (result:Result)=>ValidatableType} &
    Message<(result:Result)=>MessageType>;


export class ValueCallbackParameter<
    ValueType = unknown,
    MessageType = unknown,
    RecordType extends Record<PropertyKey, Validator<ValueType>> = Record<PropertyKey, Validator<ValueType>>,
    Result extends Partial<Record<PropertyKey, ValidatorValidatable>> = Partial<Record<PropertyKey, ValidatorValidatable>>,
    ValidatableType extends Validatable = Validatable
> extends ValueCallbackParameters<ValueType, MessageType, RecordType, Result, ValidatableType> {

    constructor({
            message,
            value,
            validators,
            map,
            validation
        } : ValueCallbackArgument<ValueType, MessageType, RecordType, Result, ValidatableType>
    ) {
        super(value, validators, (value, validators)=>map({value, validators}), validation, message);
    }
}


namespace ValueCallback {
    export const Parameters = ValueCallbackParameters;
    export const Parameter = ValueCallbackParameter;
}
export default ValueCallback;
