import Validator from '@axiona/validator/validator.js';
import MapInterface from '../../../map.js';
import {O} from 'ts-toolbelt';
import InferStatic from '@axiona/validator/validatable/infer-static.js';
import IteratorRecordValue from '../iterator/record-value.js';
import Value from '@axiona/value/value.js';
import ValidatorContainer from '@axiona/validator/validator/validator.js';

export function RecordValueParameters<
    RecordType extends Record<PropertyKey, any>,
    ValidatorType extends Validator<O.UnionOf<RecordType>>,
>(
    value : RecordType,
    validator : ValidatorType,
) : MapInterface<RecordType, InferStatic<ValidatorType>> {

    const result = {};

    for(const [key, validatable] of IteratorRecordValue.Parameters(value, validator)) {

        result[key as PropertyKey] = validatable;
    }

    return <MapInterface<RecordType, InferStatic<ValidatorType>>> result;
}


export function RecordValueParameter<
    RecordType extends Record<PropertyKey, any>,
    ValidatorType extends Validator<O.UnionOf<RecordType>>,
>(
    {
        value,
        validator,
    } : Value<RecordType> & ValidatorContainer<ValidatorType>
) : MapInterface<RecordType, InferStatic<ValidatorType>> {

    return RecordValueParameters(value, validator);
}


namespace RecordValue {
    export const Parameters = RecordValueParameters;
    export const Parameter = RecordValueParameter;
}
export default RecordValue;
