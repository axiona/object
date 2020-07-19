import Validator from "@dikac/t-validator/validator";
import Validatable from "@dikac/t-validatable/validatable";
import RecordObject from "../recursive";
import ValidatePartialValue from "../../validator/validatable/recursive/value-partial";
import And from "../../validatable/recursive/boolean/and";
import ValueInterface from "@dikac/t-value/value";
import RecursiveInferReturn from "../../validator/validatable/recursive/recursive";
import {Object} from "ts-toolbelt";

export default class ValuePartial<
    Val,
    Container extends RecordObject<PropertyKey, Validator<Val>>
    > implements Validator<
    Val,
    ValueInterface<Val> & Validatable & {validation : Object.Partial<RecursiveInferReturn<Container>, 'deep'>}
    >
{
    constructor(
        public validators : Container
    ) {
    }

    validate(argument: Val) : {validation : Object.Partial<RecursiveInferReturn<Container>, 'deep'>} & ValueInterface<Val> & Validatable {

        let results : Object.Partial<RecursiveInferReturn<Container>, 'deep'> = ValidatePartialValue(this.validators, argument);

        return  {
            value : argument,
            validation : results,
            valid : And(<any>results)
        };

    }
}



