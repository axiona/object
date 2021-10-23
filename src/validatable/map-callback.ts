import Validator from "@dikac/t-validator/validator";
import Validatable from "@dikac/t-validatable/validatable";
import RecordParameter from "../validator/base/record/infer";
import RecordBase from "../validator/base/record/infer";
import Instance from "@dikac/t-validator/validatable/validatable";
import Map from "./map";
import Pick from "../pick";
import MemoizeAccessor from "../function/memoize-accessor";
import Value from "@dikac/t-value/value";
import Validators from "../validator/validators/validators";
import Validation from "@dikac/t-boolean/validation/validation";
import Message from "@dikac/t-message/message";

export default class MapCallback<
    MessageType = unknown,
    ValidatorsType extends Record<PropertyKey, Validator> = Record<PropertyKey, Validator>,
    Result extends Partial<Record<PropertyKey, Instance>> = Partial<Record<PropertyKey, Instance>>,
    ValidatableType extends Validatable = Validatable,
    ValueType extends RecordBase<ValidatorsType> = RecordBase<ValidatorsType>
> implements Map<MessageType, ValidatorsType, Result, ValidatableType, ValueType> {

    #value : ValueType;
    #message : (result : Result)=>MessageType;
    readonly validatable : ValidatableType;
    readonly validatables : Result;

    public validators : ValidatorsType;
    private map : (values : RecordParameter<ValidatorsType>, validators : ValidatorsType)=>Result;
    private validation : (result : Result)=>ValidatableType;

    constructor(
        //value: ValueType,
        //public validators : ValidatorsType,
        //private map : (values : RecordParameter<ValidatorsType>, validators : ValidatorsType)=>Result,
        //private validation : (result : Result)=>ValidatableType,
       //  message : (result : Result)=>MessageType,
        {
            value,
            validators,
            map,
            validation,
            message
        } : Value<ValueType> &
            Validators<ValidatorsType> &
            {map : (values : RecordParameter<ValidatorsType>, validators : ValidatorsType)=>Result} &
            // TODO CHANGE TO VALIDATOR
            {validation : (result : Result)=>ValidatableType} &
            Message<(result : Result)=>MessageType>
    ) {

        this.validators = validators;
        this.map = map;
        this.validation = validation;

        this.#value = value;
        this.#message = message;
        this.validatables = this.map(this.#value, this.validators);
        this.validatable = this.validation(this.validatables);
    }

    get valid() : boolean {

        return this.validatable.valid;
    }

    get messages () : Result {

        return this.validatables;
    }

    @MemoizeAccessor()
    get value () : ValueType {

        return Pick(this.#value, ...Object.keys(this.validators)) as ValueType;
    }

    @MemoizeAccessor()
    get message() : MessageType {

        try {

            return this.#message(this.validatables);

        } catch (e) {

            throw new Error(`error on generating message, ${e}`)
        }
    }
}
