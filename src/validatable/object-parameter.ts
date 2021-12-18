import Value from "@dikac/t-value/value";
import Return from "@dikac/t-validator/validatable/simple";
import Instance from "@dikac/t-validator/validatable/validatable";
import Message from "@dikac/t-message/message";
import Static from "@dikac/t-validator/message/function/static-parameter";
import ObjectParameters from "./object-parameters";

export type ObjectArgument<
    Argument,
    MessageType,
> =
    Value<Argument> &
    Message<Static<Argument, object, false, true, MessageType>>;

export default function ObjectParameter<Argument, MessageType>(
    {
        value,
        message
    } : ObjectArgument<Argument, MessageType>
) : Return<Argument, object, Readonly<Instance<any, MessageType>>> {

    return ObjectParameters(value, (value, valid) => message({value, valid}));
}
