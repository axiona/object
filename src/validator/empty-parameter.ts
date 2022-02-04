import Validator from '@alirya/validator/validator';
import {EmptyType as EmptyParameterReturn} from '../validatable/empty-parameters';
import EmptyString from '../assert/string/empty-parameter';
import Dynamic from '@alirya/validator/message/function/validatable-parameter';
import EmptyParameters from './empty-parameters';

export default function EmptyParameter() : Validator<object, object, boolean, boolean, EmptyParameterReturn<object, string>>;

export default function EmptyParameter<MessageType>(
    message : Dynamic<object, MessageType>
) : Validator<object, object, boolean, boolean, EmptyParameterReturn<object, MessageType>>;


export default function EmptyParameter<MessageType>(
    message : Dynamic<object, MessageType|string> = EmptyString
) : Validator<object, object, boolean, boolean, EmptyParameterReturn<object, MessageType|string>> {


    return EmptyParameters((value, valid) => message({valid, value}));

}


