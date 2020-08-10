import ValidatableRecord from "./infer";
import Validator from "@dikac/t-validator/validator";
export default function Value<ValueT, Validators extends Record<keyof Validators, Validator<ValueT>>>(value: ValueT, validators: Validators): ValidatableRecord<Validators>;