import {MapPartialParameters} from '../../../dist/validator/map-partial.js';
import And from '../../../dist/validatable/and.js';
import Or from '../../../dist/validatable/or.js';
import Validatable from '@axiona/validatable/validatable.js';
import MessageMap from '../../../dist/message/message/record/map.js';
import {TypeParameters} from '@axiona/type/validator/type.js';

it('force console log', () => { spyOn(console, 'log').and.callThrough();});

describe('implicit incomplete', function() {



    const value = {
        name : {},
        age : {},
        address : {},
    };

    const validator = {
        name : TypeParameters('string'),
        age : TypeParameters('number'),
        address : TypeParameters('string'),
    };

    it(`and validation`, () => {

        const property = MapPartialParameters(validator,
            (v)=>And(<globalThis.Record<PropertyKey, Validatable>>v),
            MessageMap
        );

        const and = property(value);

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
    });

    it(`or validation `, () => {

        const property = MapPartialParameters(validator,
            (v)=>Or(<globalThis.Record<PropertyKey, Validatable>>v),
            MessageMap
        );

        const or = property(value);

        expect(or.value).toEqual(value);
        expect(or.valid).toBe(false);

        if(or.validatables.name) {
            expect(typeof or.validatables.name.message).toBe('string');
            expect(or.validatables.name.valid).toBe(false);
        } else {
            fail('validatable.validatables.name should exist');
        }

        if(or.validatables.age) {
            fail('validatable.validatables.age should not exist');
        }

        if(or.validatables.address) {
            fail('validatable.validatables.address should not exist');
        }

    });
});



describe('recursive', function() {

    const value = {
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

        const validator = {
            name : TypeParameters('string'),
            age : TypeParameters('number'),
            address : TypeParameters('string'),
            info : MapPartialParameters({
                age : TypeParameters('number'),
                hobby : TypeParameters('string'),
                no : TypeParameters('number'),
            },(v)=>And(v), MessageMap)
        };

        const property = MapPartialParameters(validator,
            (v)=>And(v),
            MessageMap
        );

        const and = property(value);

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
    });

    it(`or validation `, () => {


        const validator = {
            name : TypeParameters('string'),
            age : TypeParameters('number'),
            address : TypeParameters('string'),
            info : MapPartialParameters({
                age : TypeParameters('number'),
                hobby : TypeParameters('string'),
                no : TypeParameters('number'),
            },(v)=>Or(v), MessageMap)
        };

        const property = MapPartialParameters(validator,
            (v)=>Or(v),
            MessageMap
        );

        const or = property(value);

        expect(or.value).toEqual(value);
        expect(or.valid).toBe(false);

        if(or.validatables.name) {
            expect(typeof or.validatables.name.message).toBe('string');
            expect(or.validatables.name.valid).toBe(false);
        } else {
            fail('validatable.validatables.name should exist');
        }

        if(or.validatables.age) {
            fail('validatable.validatables.age should not exist');
        }

        if(or.validatables.address) {
            fail('validatable.validatables.address should not exist');
        }

        if(or.validatables.info) {
            fail('validatable.validatables.info should not exist');
        }
    });

});

