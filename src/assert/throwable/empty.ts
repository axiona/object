import EmptyType from '../string/empty';

export function EmptyParameters(
     value : object,
     subject : string = 'object',
) : Error {

    return new Error(EmptyType.Parameters(value, false, subject));
}


import Value from '@alirya/value/value';

export type EmptyArgument = Value<object> & {subject?: string};

export function EmptyParameter(
    {
        value,
        subject = 'object',

    } : EmptyArgument
) : Error {

    return EmptyParameters(value, subject);
}


namespace Empty {
    export const Parameters = EmptyParameters;
    export const Parameter = EmptyParameter;
    export type Argument = EmptyArgument;
}
export default Empty;
