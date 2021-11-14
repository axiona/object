import ValidatorsContainer from "../../validators/validators";
import Validator from "@dikac/t-validator/validator";
import InferReturn from "@dikac/t-validator/validatable/infer-static";
import Value from "@dikac/t-value/value";
//
// export default Value;
// namespace Value {
//
//     export const Parameter = ValueParameter;
//     export const Object = ValueObject;
//     export type Argument<
//         ValueType,
//         Validators extends Record<PropertyKey, Validator<ValueType>>,
//     > = ValueArgument<
//         ValueType,
//         Validators
//     >;
// }
//
// export function * ValueParameter<
//     ValueType,
//     Validators extends Record<PropertyKey, Validator<ValueType>>,
// >(
//     value : ValueType,
//     validators : Validators,
//     // {
//     //     value,
//     //     validators
//     // } : ValidatorsContainer<Validators> & Value<ValueType>
// ) : Iterable<[keyof Validators, InferReturn<Validators[keyof Validators]>]> {
//
//     let object  = {};
//
//     for(let property in validators) {
//
//         const validator = validators[property];
//
//         yield [
//             object[<PropertyKey>property],
//             validator(value) as InferReturn<Validators[keyof Validators]>
//         ];
//     }
// }

// export type ValueArgument<
//     ValueType,
//     Validators extends Record<PropertyKey, Validator<ValueType>>,
//     >
//     = ValidatorsContainer<Validators> & Value<ValueType>

export default function * ValueParameter<
    ValueType,
    Validators extends Record<PropertyKey, Validator<ValueType>>,
>(
    //value : ValueType,
    //validators : Validators,
    {
        value,
        validators
    } : ValidatorsContainer<Validators> & Value<ValueType>
) : Iterable<[keyof Validators, InferReturn<Validators[keyof Validators]>]> {

    let object  = {};

    for(let property in validators) {

        const validator = validators[property];

        yield [
            object[<PropertyKey>property],
            validator(value) as InferReturn<Validators[keyof Validators]>
        ];
    }
}
