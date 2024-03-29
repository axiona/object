/**
 * iterate {@param object} property and value in array form
 */
export default function * Pair<Property extends PropertyKey, Value extends any>(
    object : Record<Property, Value>
) : Iterable<[Property, Value]> {

    for (const property in object) {

        yield [property, object[property]];
    }
}
