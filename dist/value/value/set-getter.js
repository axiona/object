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
 * @param configurable {@default true}
 */
export default function SetGetter(
// object : This,
// property : keyof This,
// value : Type,
// configurable : boolean = true,
{ object, property, value, configurable = true, }) {
    return Object.defineProperty(object, property, {
        get: () => value,
        configurable: configurable
    })[property];
}
//# sourceMappingURL=set-getter.js.map