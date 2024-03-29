import isPlainObject from 'is-plain-object';

/**
 * Check if plain object ({})
 */
export default function Plain(value : unknown) : value is object {

    return isPlainObject(value);
}
