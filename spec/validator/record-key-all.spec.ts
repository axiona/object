import {RecordKeyAllParameters} from '../../dist/validator/record-key-all.js';
import And from '../../dist/validatable/and.js';
import Or from '../../dist/validatable/or.js';
import Validatable from '@alirya/validatable/validatable.js';
import ValidatorInterface from '@alirya/validator/simple.js';
import Message from '@alirya/message/message.js';
import MessageMap from '../../dist/message/message/record/map.js';
import {TypeParameters} from '@alirya/type/validator/type.js';
import Instance from '@alirya/validator/validatable/validatable.js';
import Callbacks from '@alirya/validator/callback-parameters.js';

it('force console log', () => { spyOn(console, 'log').and.callThrough();});

describe('compiler compatibility', function() {

    type TypeValidatorValue = ValidatorInterface<PropertyKey, string, Instance<PropertyKey, string>>;

    let validator = TypeParameters('string');

    type Type = {
        name : string,
        address : string,
    };

    let value = {
        name : 'name',
        address : 'address',
    };

    it('implicit', function() {

        let property = RecordKeyAllParameters(validator, And, MessageMap);

        let validatable = property(value);

        if(validatable.valid) {

            let string : Type = validatable.value;

        } else {

            let unknown : unknown = validatable.value;
        }

    });

    describe('explicit complete', function() {

        it('auto', function() {

            let property = RecordKeyAllParameters<TypeValidatorValue>(validator,
                (v)=>And(v),
                MessageMap
            );

            let validatable = property(value);

            let unknown : unknown = validatable.value;
            let record : Type = validatable.value;

        });

        it('direct', function() {

            let property = RecordKeyAllParameters<TypeValidatorValue>(validator,
                (v)=>And(<globalThis.Record<any, Validatable>>v),
                MessageMap
            );

            let validatable = property(value);

            let unknown : unknown = validatable.value;
            let record : Type = validatable.value;

        });
    });

    it('implicit partial', function() {

        let property = RecordKeyAllParameters(validator,
            (v)=>And(<globalThis.Record<PropertyKey, Validatable>>v),
            MessageMap
        );

        let validatable = property(value);

        let unknown : unknown = validatable.value;
        let val : Type = validatable.value;

    });

    describe('explicit complete', function() {

        it('auto', function() {

            let property = RecordKeyAllParameters<TypeValidatorValue>(
                validator,
                (v)=>And(<globalThis.Record<any, Validatable>>v),
                MessageMap
            );

            let validatable = property(value);

            let unknown : unknown = validatable.value;
            let string : Type = validatable.value;

        });

        it('direct', function() {

            let property = RecordKeyAllParameters<TypeValidatorValue>(
                validator,
                (v)=>And(<globalThis.Record<any, Validatable>>v),
                (v)=>MessageMap(<globalThis.Record<any, Message>>v)
            );

            let validatable = property(value);

            let unknown : unknown = validatable.value;
            let string : Type = validatable.value;

        });
    });
});





describe('implicit complete', function() {

    describe('all valid', function() {

        let validator = TypeParameters('string');

        let value = {
            name : 'string',
            address : 'string',
            user : 'string',
        };

        it(`and validation`, () => {

            let property =  RecordKeyAllParameters(validator,
                (v)=>And(v),
                MessageMap
            );

            let validatable = property(value);

            expect(validatable.valid).toBe(true);
            expect(validatable.value).toBe(value);

            expect(validatable.validatables.name.valid).toBe(true);
            expect(typeof validatable.validatables.name.message).toBe('string');

            expect(validatable.validatables.address.valid).toBe(true);
            expect(typeof validatable.validatables.address.message).toBe('string');

            expect(validatable.validatables.user.valid).toBe(true);
            expect(typeof validatable.validatables.user.message).toBe('string');
        });


        it(`or validation`, () => {

            let property =  RecordKeyAllParameters(validator,
                (v)=>Or(v),
                MessageMap
            );

            let validatable = property(value);

            expect(validatable.valid).toBe(true);
            expect(validatable.value).toBe(value);

            expect(validatable.validatables.name.valid).toBe(true);
            expect(typeof validatable.validatables.name.message).toBe('string');

            expect(validatable.validatables.address.valid).toBe(true);
            expect(typeof validatable.validatables.address.message).toBe('string');

            expect(validatable.validatables.user.valid).toBe(true);
            expect(typeof validatable.validatables.user.message).toBe('string');
        });
    });


    describe('mixed', function() {

        let validator = Callbacks<string, string>(function (value) {
            return  ['name', 'address'].includes(value);
        }, function (value, valid){
            return value + ' ' + (valid ? 'valid' : 'true');
        }, );

        let value = {
            name : 'string',
            age : 'string',
            address : 'string',
        };

        it(`and validation`, () => {

            let property = RecordKeyAllParameters(validator,
                (v)=>And(v),
                MessageMap
            );

            let and = property(value);

            expect<boolean>(and.valid).toBe(false);

            expect(and.validatables.name.valid).toBe(true);
            expect(and.validatables.name.message).toBe('name valid');

            expect(and.validatables.age.valid).toBe(false);
            expect(and.validatables.age.message).toBe('age true');

            expect(and.validatables.address.valid).toBe(true);
            expect(and.validatables.address.message).toBe('address valid');

            expect(and.value).toBe(value);
        });


        it(`or validation `, () => {

            let property = RecordKeyAllParameters(validator,
                (v)=>Or(v),
                MessageMap
            );

            let or = property(value);

            expect(or.valid).toBe(true);
            expect(or.value).toBe(value);

            expect(or.validatables.name.message).toBe('name valid');
            expect(or.validatables.name.valid).toBe(true);

            expect(or.validatables.age.message).toBe('age true');
            expect(or.validatables.age.valid).toBe(false);

            expect(or.validatables.address.message).toBe('address valid');
            expect(or.validatables.address.valid).toBe(true);

        });
    });


    describe('all invalid', function() {

        let validator = Callbacks<string, string>(function (value) {
            return ! ['name', 'age', 'address'].includes(value);
        },function (value, valid){
            return value + ' ' + (valid ? 'valid' : 'true');
        }, );


        let value = {
            name : 'string',
            age : 'string',
            address : 'string',
        };

        it(`and validation`, () => {

            let property = RecordKeyAllParameters(validator,
                (v)=>And(v),
                MessageMap
            );

            let and = property(value);

            expect<boolean>(and.valid).toBe(false);
            expect(and.value).toEqual(value);

            expect(and.validatables.name.valid).toBe(false);
            expect(and.validatables.name.message).toBe('name true');

            expect(and.validatables.age.valid).toBe(false);
            expect(and.validatables.age.message).toBe('age true');

            expect(and.validatables.address.valid).toBe(false);
            expect(and.validatables.address.message).toBe('address true');
        });

        it(`or validation `, () => {

            let property = RecordKeyAllParameters(validator,
                (v)=>Or(v),
                MessageMap
            );

            let or = property(value);

            expect<boolean>(or.valid).toBe(false);
            expect(or.value).toEqual(value);

            expect(or.validatables.name.message).toBe('name true');
            expect(or.validatables.name.valid).toBe(false);

            expect(or.validatables.age.message).toBe('age true');
            expect(or.validatables.age.valid).toBe(false);

            expect(or.validatables.address.message).toBe('address true');
            expect(or.validatables.address.valid).toBe(false);
        });
    });
});
