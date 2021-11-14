import Validator from "@dikac/t-validator/validator";
import NotEmptyValidatable from "../validatable/not-empty";
import Dynamic from "@dikac/t-validator/message/function/dynamic";
export default function NotEmptyParameters<MessageType>(): Validator<object, object, boolean, boolean, NotEmptyValidatable.Type<object, string>>;
export default function NotEmptyParameters<MessageType>(message: Dynamic.Parameters<object, MessageType>): Validator<object, object, boolean, boolean, NotEmptyValidatable.Type<object, MessageType>>;
