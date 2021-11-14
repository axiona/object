/**
 * set {@param value} for getter value for {@param object}
 * should be used inside getter callback
 *
 * @param object
 *
 * @param property
 * getter key
 *
 * @param value
 * value tobe memoized
 *
 * @param writable
 *
 * @param configurable {@default true}
 */
export default function SetMethodParameters(object, property, value, writable = true, configurable = true) {
    return Object.defineProperty(object, property, {
        value: () => value,
        writable,
        configurable
    })[property]();
}
//# sourceMappingURL=set-method-parameters.js.map