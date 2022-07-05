import Name from '../../string/name';
import Validatable from '@alirya/validatable/validatable';
import Value from '@alirya/value/value';

/**
 * string intended for not NotEmpty object
 *
 * @param valid
 * @param value
 * @param subject
 */

export function NotEmptyParameters(
    value : object,
    valid : boolean,
    subject : string = ''
) : string {

    const strings : string[] = [];

    strings.push(subject);
    strings.push(Name(value));

    if(valid) {

        strings.push('is not');

    } else {

        strings.push('must not');
    }

    strings.push('empty object');

    return (strings.join(' ') + '.').trim();
}


export type NotEmptyArgument = Validatable & Value<object> & {subject?: string};

export function NotEmptyParameter(
    {
        valid,
        value,
        subject = '',

    } : NotEmptyArgument
) : string {

    return NotEmptyParameters(value, valid, subject);
}


namespace NotEmpty {
    export const Parameters = NotEmptyParameters;
    export const Parameter = NotEmptyParameter;
    export type Argument = NotEmptyArgument;
}
export default NotEmpty;