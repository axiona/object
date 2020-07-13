import Record from "./record";
import { O } from "ts-toolbelt";
/**
 * recursively filter {@param record} value, returning new object with all value allowed
 * by {@param filter}
 *
 * {@param validation} is used to distinguish between value to be validated by {@param filter} or tobe called
 * recursively
 */
export default function Filter<Type, Object extends Record<keyof any, Type> = Record<keyof any, Type>>(record: Object, validation: (value: any) => value is Type, filter: (value: Type) => boolean): O.Partial<Object, 'deep'>;
