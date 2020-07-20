import Validator from "@dikac/t-validator/validator";
import Validatable from "@dikac/t-validatable/validatable";
import RecordObject from "../recursive";
import ValidateValue from "../../validatable/recursive/value";
import And from "../../validatable/recursive/boolean/and";
import ValueInterface from "@dikac/t-value/value";
import RecursiveInferReturn from "../../validatable/recursive/recursive";

export default class Value<
    Val,
    Container extends RecordObject<PropertyKey, Validator<Val>>
    > implements Validator<
    Val,
    ValueInterface<Val> & Validatable & {validation : RecursiveInferReturn<Container>}
    >
{
    constructor(
        public validators : Container
    ) {
    }

    validate(argument: Val) : {validation : RecursiveInferReturn<Container>} & ValueInterface<Val> & Validatable {

        let results : RecursiveInferReturn<Container> = ValidateValue(this.validators, argument, false);

        return  {
            value : argument,
            validation : results,
            valid : And(<any>results)
        };

    }
}



