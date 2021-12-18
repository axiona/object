import Validator from "@dikac/t-validator/validator";
import MapInterface from "../../../map";
import {O} from "ts-toolbelt";
import InferStatic from "@dikac/t-validator/validatable/infer-static";
import IteratorRecordValue from "../iterator/record-value-parameters";

export default function RecordValueParameters<
    RecordType extends Record<PropertyKey, any>,
    ValidatorType extends Validator<O.UnionOf<RecordType>>,
>(
    value : RecordType,
    validator : ValidatorType,
) : MapInterface<RecordType, InferStatic<ValidatorType>> {

    let result = {};

    for(const [key, validatable] of IteratorRecordValue(value, validator)) {

        result[key as PropertyKey] = validatable;
    }

    return <MapInterface<RecordType, InferStatic<ValidatorType>>> result;
}