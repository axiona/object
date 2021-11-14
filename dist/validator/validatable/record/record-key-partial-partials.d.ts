import Validator from "@dikac/t-validator/validator";
import MapInterface from "../../../map";
import Return from "@dikac/t-validator/validatable/infer-static";
export default function RecordKeyPartialParameters<RecordType extends Record<PropertyKey, any>, ValidatorType extends Validator<keyof RecordType>>(value: RecordType, validator: ValidatorType, stop?: boolean): Partial<MapInterface<RecordType, Return<ValidatorType>>>;
