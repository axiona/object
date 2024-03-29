import Message from '@axiona/message/message.js';

export default interface Messages<
    Object extends Partial<Record<PropertyKey, Message>> = Partial<Record<PropertyKey, Message>>
> {

    messages : Object;
}

