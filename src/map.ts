import Value from "./record/infer/value";
import Fn from "@dikac/t-function/function";

/**
 * Calls {@param replace} on each property value from {@param object} recursively
 *
 * {@template Replace} type of replace result
 */
export default function Map<Replace, Object extends Record<any, any>>(
    object : Object,
    replace : Fn<[Value<Object>], Replace>
) : Record<keyof Object, Replace> {

    let result : Record<keyof Object, Replace> = <Record<keyof Object, Replace>>{};

    for(let property in object) {

        const value = object[property];

        result[property] = replace(value);

    }

    return  result;
}
