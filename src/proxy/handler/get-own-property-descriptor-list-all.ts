import Exists from '../../property/boolean/exists';
import {Required} from 'utility-types';
import MultiHandlers from './multi-handlers';
import Descriptor from '../../descriptor/from-object-parameters';
import MergeGetterSetterParameters from '../../../dist/descriptor/merge-getter-setter-parameters';
import OmitUndefined from '../../omit-undefined';

export default class GetOwnPropertyDescriptorListAll<
    Target extends object,
    Objects extends object[]
> extends MultiHandlers<Target, Objects> implements Required<ProxyHandler<Target>, 'getOwnPropertyDescriptor'> {

    private descriptor : Record<PropertyKey, PropertyDescriptor|undefined> = {};

    reset() {

        this.descriptor = {};
    }

    bindTo<Argument extends Target>(handler : ProxyHandler<Argument>) : Required<ProxyHandler<Argument>, 'getOwnPropertyDescriptor'> {

        handler.getOwnPropertyDescriptor = (target: Target, p: PropertyKey) => this.getOwnPropertyDescriptor(target, p);

        return handler as Required<ProxyHandler<Argument>, 'getOwnPropertyDescriptor'>;
    }

    getOwnPropertyDescriptor(target: Target, property: PropertyKey) : PropertyDescriptor | undefined {

        if(Exists(this.descriptor, property)) {

            // @ts-ignore
            return this.descriptor[property];
        }

        const descriptors : PropertyDescriptor[] = [];

        for(const object of this.getHandler(target)) {

           // const descriptor = Reflect.getOwnPropertyDescriptor(object, property);
            const descriptor = Descriptor(object, property);

            if(descriptor) {

                descriptors.push(descriptor);
            }
        }

        if(descriptors.length === 0) {

            // @ts-ignore
            this.descriptor[property] = undefined;

        } else if(descriptors.length === 1) {

            // @ts-ignore
            this.descriptor[property] = descriptors[0];

        } else  {

            let descriptor : PropertyDescriptor = <PropertyDescriptor> descriptors.shift();

            for (const compare of descriptors) {

                for(const prop of ['configurable', 'enumerable', /*'value',*/ 'writable', 'get', 'set']) {

                    if(descriptor[prop] === undefined || compare[prop] === undefined) {

                        continue;
                    }

                    if(descriptor[prop] !== compare[prop]) {

                        throw new Error(`descriptor.${prop} is not consistent between source`);
                    }
                }

               // let descriptor2 = MergeGetterSetterParameters(descriptor as any, compare);
                descriptor = Object.assign({}, OmitUndefined(descriptor), OmitUndefined(compare));
               // console.log(descriptor2);
            }

            //console.log(descriptor);

            // @ts-ignore
            this.descriptor[property] = descriptor;
        }

        // @ts-ignore
        return this.descriptor[property];
    }
}
