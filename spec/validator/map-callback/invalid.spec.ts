import {MapCallbackParameters} from '../../../dist/validator/map-callback';
import {MapPartialParameters} from '../../../dist/validator/validatable/record/map-partial';
import {MapParameters} from '../../../dist/validator/validatable/record/map';
import And from '../../../dist/validatable/and';
import Or from '../../../dist/validatable/or';
import Validatable from '@alirya/validatable/validatable';
import MessageMap from '../../../dist/message/message/record/map';
import {TypeParameters} from '@alirya/type/validator/type';
import Instance from '@alirya/validator/validatable/validatable';
import InferReturn from '../../../dist/validator/validatable/record/infer';

it('force console log', () => { spyOn(console, 'log').and.callThrough();});

describe('flat', function() {

    let value = {
        name : {},
        age : {},
        address : {},
    };

    it(`and validation`, () => {

        let validator = {
            name : TypeParameters('string'),
            age : TypeParameters('number'),
            address : TypeParameters('string'),
        };

        let property = MapCallbackParameters<typeof validator, InferReturn<typeof validator>>(validator, MapParameters, And, MessageMap);

        let and = property(value);

        expect(and.valid).toBe(false);
        expect(and.value).toEqual(value);

        expect(and.validatables.name.valid).toBe(false);
        expect(typeof and.validatables.name.message).toBe('string');

        expect(and.validatables.age.valid).toBe(false);
        expect(typeof and.validatables.age.message).toBe('string');

        expect(and.validatables.address.valid).toBe(false);
        expect(typeof and.validatables.address.message).toBe('string');
    });

    it(`or validation `, () => {

        let validator = {
            name : TypeParameters('string'),
            age : TypeParameters('number'),
            address : TypeParameters('string'),
        };

        let property = MapCallbackParameters<typeof validator, InferReturn<typeof validator>>(validator, MapParameters, And, MessageMap);

        let or = property(value);
        expect(or.valid).toBe(false);
        expect(or.value).toEqual(value);

        expect(typeof or.validatables.name.message).toBe('string');
        expect(or.validatables.name.valid).toBe(false);

        expect(typeof or.validatables.age.message).toBe('string');
        expect(or.validatables.age.valid).toBe(false);

        expect(typeof or.validatables.address.message).toBe('string');
        expect(or.validatables.address.valid).toBe(false);
    });
});


describe('recursive', function() {

    let value = {
        name : {},
        age : {},
        address : {},
        info : {
            age : {},
            hobby : {},
            no : {},
        }
    };

    it(`and validation`, () => {

        let validator = {
            name : TypeParameters('string'),
            age : TypeParameters('number'),
            address : TypeParameters('string'),
            info : MapCallbackParameters({
                    age : TypeParameters('number'),
                    hobby : TypeParameters('string'),
                    no : TypeParameters('number')
                },
                (value, validators) => <Record<PropertyKey, Instance<any, string>>>MapPartialParameters(value, validators),
                And, MessageMap)
        };

        let property = MapCallbackParameters(validator,
            (value, validators) => <Record<PropertyKey, Instance<any, string>>>MapPartialParameters(value, validators),
            (v)=>And(<globalThis.Record<PropertyKey, Validatable>>v), MessageMap
        );

        let and = property(value);

        expect(and.valid).toBe(false);
        expect(and.value).toEqual(value);

        if(and.validatables.name) {
            expect(and.validatables.name.valid).toBe(false);
            expect(typeof and.validatables.name.message).toBe('string');
        } else {
            fail('validatable.validatables.name should exist');
        }

        if(and.validatables.age) {
            fail('validatable.validatables.age should not exist');
        }

        if(and.validatables.address) {
            fail('validatable.validatables.address should not exist');
        }


        expect(and.validatables.info).toBe(<any>undefined);
    });

    it(`or validation `, () => {


        let validator = {
            name : TypeParameters('string'),
            age : TypeParameters('number'),
            address : TypeParameters('string'),
            info : MapCallbackParameters({
                    age : TypeParameters('number'),
                    hobby : TypeParameters('string'),
                    no : TypeParameters('number')
                },
                (value, validators) => <Record<PropertyKey, Instance<any, string>>>MapPartialParameters(value, validators),
                Or, MessageMap)
        };

        let property = MapCallbackParameters(validator,
            (value, validators) => <Record<PropertyKey, Instance<any, string>>>MapPartialParameters(value, validators),
            (v)=>Or(<globalThis.Record<PropertyKey, Validatable>>v), MessageMap
        );

        let or = property(value);

        expect(or.value).toEqual(value);
        expect(or.valid).toBe(false);

        if(or.validatables.name) {
            expect(typeof or.validatables.name.message).toBe('string');
            expect(or.validatables.name.valid).toBe(false);
        } else {
            fail('validatable.validatables.name should exist');
        }

        expect(or.validatables.age).toBe(<any>undefined);
        expect(or.validatables.address).toBe(<any>undefined);
        expect(or.validatables.info).toBe(<any>undefined);

    });

});


describe('invalid type', function() {

    it(`and validation`, () => {

        let validator = {
            name : TypeParameters('string'),
            age : TypeParameters('number'),
            address : TypeParameters('string'),
        };

        let property = MapCallbackParameters<typeof validator, InferReturn<typeof validator>>(validator, MapParameters, And, MessageMap);

        // TODO MAKE NON ANY
        let and = property(undefined as any);

        expect<boolean>(and.valid).toBe(false);
        expect(and.value).toEqual(undefined);
        // TODO MORE TEST ON NON OBJECT

    });

});
