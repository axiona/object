import Validator from "@dikac/t-validator/simple";
import Validatable from "@dikac/t-validatable/validatable";
import Message from "@dikac/t-message/message";
import Value from "@dikac/t-value/value";
import ObjectValidatable from "../validatable/object";
import Instance from "@dikac/t-validator/validatable/validatable";
import Return from "@dikac/t-validator/validatable/simple";
import {A} from "ts-toolbelt";
//
// export default class Object_<MessageType>
//     implements
//         Validator<unknown, object, Readonly<Instance<object, MessageType>>>,
//         Message<(result:Readonly<Value> & Readonly<Validatable>)=>MessageType>
// {
//     constructor(
//        public message : (result:Readonly<Value> & Readonly<Validatable>)=>MessageType
//     ) {
//     }
//
//     validate<Argument extends object>(value: Argument): Readonly<Instance<Argument, MessageType, true>>
//     validate<Argument extends unknown>(value: Argument): Return<any, Argument, object, Readonly<Instance<object, MessageType>>>
//     validate<Argument extends unknown>(value: Argument) {
//
//         return  ObjectValidatable<MessageType, Argument>(value, this.message);
//     }
// }

export default function Object_<MessageType>(
    message : (result:Readonly<Value> & Readonly<Validatable>)=>MessageType
) : Validator<unknown, object, Readonly<Instance<object, MessageType>>> {

    return function <Argument extends unknown, Type extends object>(value : Argument|Type) {

        return  ObjectValidatable<MessageType, Argument>(value as Argument, message);

    } as Validator<unknown, object, Readonly<Instance<object, MessageType>>>
}
