import Validator from "@dikac/t-validator/validator";
import {O} from "ts-toolbelt";
import Return from "@dikac/t-validator/validatable/infer-static";

export default function * RecordValueParameters<
    RecordType extends Record<PropertyKey, any>,
    ValidatorType extends Validator<O.UnionOf<RecordType>>,
>(
    value : RecordType,
    validator : ValidatorType,
) : Iterable<[keyof RecordType, Return<ValidatorType>]> {

    let result = {};

    for(const key in value) {

        yield [result[key as PropertyKey], validator(value[key]) as Return<ValidatorType>];
    }
}
