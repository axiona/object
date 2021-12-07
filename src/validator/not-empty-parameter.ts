import Validator from "@dikac/t-validator/validator";
import {NotEmptyType} from "../validatable/not-empty-parameters";
import NotEmptyString from "../assert/string/not-empty-parameter";
import Dynamic from "@dikac/t-validator/message/function/validatable";
import NotEmptyParameters from "./not-empty-parameters";

export default function NotEmptyParameter<MessageType>() : Validator<object, object, boolean, boolean, NotEmptyType<object, string>>;

export default function NotEmptyParameter<MessageType>(
    message : Dynamic.Parameter<object, MessageType>
) : Validator<object, object, boolean, boolean, NotEmptyType<object, MessageType>>;

export default function NotEmptyParameter<MessageType>(
    message : Dynamic.Parameter<object, MessageType|string> = NotEmptyString
) : Validator<object, object, boolean, boolean, NotEmptyType<object, MessageType|string>> {

    return NotEmptyParameters((value, valid) => message({valid, value}));

}
