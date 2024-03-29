import SymbolType from '../../symbol/boolean/symbol.js';

/**
 * check if {@param value} is valid object key/property
 * @param value
 */
export default function Property(
    value : unknown
) : value is PropertyKey {

    switch (typeof value) {
        case 'number' :
        case 'string' :
        case 'symbol' :
            return true;
    }

    return SymbolType(value);
}
