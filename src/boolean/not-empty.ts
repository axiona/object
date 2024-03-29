import Empty from './empty.js';

/**
 * check if object is not empty (contain zero property & method)
 */
export default function NotEmpty(
    value : object
) : boolean {

    return !Empty(value);
}
