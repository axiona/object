import MapParameters from "./map-parameters";
//
// export default Map;
// namespace Map {
//
//     export const Parameter = MapParameter;
//     export const Object = MapObject;
//     export type Argument<
//         Validators extends Record<PropertyKey, Validator>
//         > = MapArgument<Validators>;
// }
//
// export function * MapParameter<
//     Validators extends Record<PropertyKey, Validator>
// >(
//     value : RecordParameter<Validators>,
//     validators : Validators,
// ) : Iterable<[keyof Validators, InferReturn<Validators[keyof Validators]>]> {
//
//     for(let property in validators) {
//
//         const validator = validators[property];
//         const val = value[property];
//
//         yield [property, validator(val) as InferReturn<Validators[keyof Validators]>];
//     }
// }
// export type MapArgument<Validators extends Record<PropertyKey, Validator>>
//     = Value<RecordParameter<Validators>> & ValidatorsContainer<Validators>
export default function* MapParameter(
//values : RecordParameter<Validators>,
//validators : Validators,
{ value, validators }) {
    return MapParameters(value, validators);
}
//# sourceMappingURL=map-parameter.js.map