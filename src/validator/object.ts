import Validator from '@alirya/validator/simple';
import ObjectValidatable from '../validatable/object';
import Instance from '@alirya/validator/validatable/validatable';
import ObjectString from '../assert/string/object';
import Simple from '@alirya/validator/message/function/simple';

export function ObjectParameters() : Validator<unknown, object, Readonly<Instance<object, string>>>;

export function ObjectParameters<MessageType>(
    message : Simple.Parameters<unknown, object, MessageType>
) : Validator<unknown, object, Readonly<Instance<object, MessageType>>>;

export function ObjectParameters<MessageType>(
    message : Simple.Parameters<unknown, object, MessageType|string> = ObjectString.Parameters
) : Validator<unknown, object, Readonly<Instance<object, MessageType>>> {

    return function (value ) {

        return  ObjectValidatable.Parameters(value, message);

    } as Validator<unknown, object, Readonly<Instance<object, MessageType>>>;
}


export function ObjectParameter() : Validator<unknown, object, Readonly<Instance<object, string>>>;

export function ObjectParameter<MessageType>(
    message : Simple.Parameter<unknown, object, MessageType>
) : Validator<unknown, object, Readonly<Instance<object, MessageType>>>;

export function ObjectParameter<MessageType>(
    message : Simple.Parameter<unknown, object, MessageType|string> = ObjectString.Parameter
) : Validator<unknown, object, Readonly<Instance<object, MessageType|string>>> {

    if(message) {

        return ObjectParameters((value, valid) => message({value, valid}));

    } else {

        return ObjectParameters();
    }
}


namespace Object {
    export const Parameters = ObjectParameters;
    export const Parameter = ObjectParameter;
}
export default Object;
