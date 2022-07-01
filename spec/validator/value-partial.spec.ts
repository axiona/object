import {ValuePartialParameters} from '../../dist/validator/value-partial';
import And from '../../dist/validatable/and';
import Or from '../../dist/validatable/or';
import Validatable from '@alirya/validatable/validatable';
import MessageMap from '../../dist/message/message/record/map';
import Type from '@alirya/type/validator/type-parameters';
import Message from '@alirya/message/message';


it('force console log', () => { spyOn(console, 'log').and.callThrough();});

describe('compiler compatibility', function() {

    let validator = {
        name : Type('string'),
        address : Type('string'),
    };

    it('implicit partial', function() {

        let property = ValuePartialParameters(validator, And, MessageMap);

        let validatable = property('data');

        let unknown : unknown = validatable.value;

        let string : string = validatable.value;

    });

    it('explicit complete', function() {

        let property = ValuePartialParameters<string, string, {name : string, address : string}, typeof validator>(validator,
            And,
            (v)=><{name : string, address : string}>MessageMap(<{name : Message<string>, address : Message<string>}>v)
        );

        let validatable = property('data');


        let unknown : unknown = validatable.value;
        let string : string = validatable.value;

    });
});

describe('implicit incomplete', function() {

    describe('all valid', function() {

        let value = 'data';

        it(`and validation`, () => {

            let validator = {
                name : Type('string'),
                address : Type('string'),
                user : Type('string'),
            };

            let property = ValuePartialParameters(
                validator,
                (v)=>And(<Record<PropertyKey, Validatable>>v),
                MessageMap
            );

            let validatable = property(value);

            expect(validatable.valid).toBe(true);
            expect(validatable.value).toBe(value);

            if(validatable.validatables.name) {

                expect(validatable.validatables.name.valid).toBe(true);
                expect(typeof validatable.validatables.name.message).toBe('string');

            } else {

                fail('validatable.validatables.name should exist');
            }


            if(validatable.validatables.address) {

                expect(validatable.validatables.address.valid).toBe(true);
                expect(typeof validatable.validatables.address.message).toBe('string');

            } else {

                fail('validatable.validatables.address should exist');
            }


            if(validatable.validatables.user) {

                expect(validatable.validatables.user.valid).toBe(true);
                expect(typeof validatable.validatables.user.message).toBe('string');

            } else {

                fail('validatable.validatables.user should exist');
            }

        });


        it(`or validation`, () => {

            let validator = {
                name : Type('string'),
                address : Type('string'),
                user : Type('string'),
            };

            let property = ValuePartialParameters(
                validator,
                (v)=>Or(<Record<PropertyKey, Validatable>>v),
                MessageMap
            );

            let validatable = property(value);

            expect(validatable.valid).toBe(true);
            expect(validatable.value).toBe(value);


            if(validatable.validatables.name) {

                expect(validatable.validatables.name.valid).toBe(true);
                expect(typeof validatable.validatables.name.message).toBe('string');

            } else {

                fail('validatable.validatables.name should exist');
            }


            if(validatable.validatables.address) {

                expect(validatable.validatables.address.valid).toBe(true);
                expect(typeof validatable.validatables.address.message).toBe('string');

            } else {

                fail('validatable.validatables.address should exist');
            }


            if(validatable.validatables.user) {

                expect(validatable.validatables.user.valid).toBe(true);
                expect(typeof validatable.validatables.user.message).toBe('string');

            } else {

                fail('validatable.validatables.user should exist');
            }
        });
    });


    describe('mixed', function() {

        it(`and validation`, () => {

            let validator = {
                name : Type('string'),
                age : Type('number'),
                address : Type('string'),
            };

            let property = ValuePartialParameters(
                validator,
                (v)=>And(<Record<PropertyKey, Validatable>>v),
                MessageMap
            );

            let and = property('data');

            expect<boolean>(and.valid).toBe(false);
            expect(and.value).toBe('data');

            if(and.validatables.name) {
                expect(and.validatables.name.valid).toBe(true);
                expect(typeof and.validatables.name.message).toBe('string');

            } else {
                fail('validatable.validatables.name should exist');
            }

            if(and.validatables.age) {
                expect(and.validatables.age.valid).toBe(false);
                expect(typeof and.validatables.age.message).toBe('string');

            } else {
                fail('validatable.validatables.age should exist');
            }

            if(and.validatables.address) {
                fail('validatable.validatables.address should exist');
            }
        });


        it(`or validation `, () => {


            let validator = {
                name : Type('string'),
                age : Type('number'),
                address : Type('string'),
            };

            let property = ValuePartialParameters(
                validator,
                (v)=>Or(<Record<PropertyKey, Validatable>>v),
                MessageMap
            );

            let or = property('data');
            expect(or.value).toBe('data');
            expect(or.valid).toBe(true);

            if(or.validatables.name) {
                expect(typeof or.validatables.name.message).toBe('string');
                expect(or.validatables.name.valid).toBe(true);
            } else {
                fail('validatable.validatables.name should exist');
            }

            if(or.validatables.age) {
                expect(typeof or.validatables.age.message).toBe('string');
                expect(or.validatables.age.valid).toBe(false);
            } else {
                fail('validatable.validatables.age should exist');
            }

            if(or.validatables.address) {
                fail('validatable.validatables.address should exist');
            }

        });
    });


    describe('all invalid', function() {


        it(`and validation`, () => {

            let validator = {
                name : Type('string'),
                age : Type('number'),
                address : Type('string'),
            };


            let property = ValuePartialParameters(
                validator,
                (v)=>And(<Record<PropertyKey, Validatable>>v),
                MessageMap
            );

            let and = property({});

            expect<boolean>(and.valid).toBe(false);
            expect(and.value).toEqual({});

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

            let validator = {
                name : Type('string'),
                age : Type('number'),
                address : Type('string'),
            };


            let property = ValuePartialParameters(
                validator,
                (v)=>Or(<Record<PropertyKey, Validatable>>v),
                MessageMap
            );

            let or = property({});

            expect(or.value).toEqual({});
            expect<boolean>(or.valid).toBe(false);

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
});



describe('recursive', function() {

    describe('all valid', function() {

        let value = 'data';

        it(`and validation`, () => {

            let validator = {
                name : Type('string'),
                address : Type('string'),
                user : Type('string'),
                info : ValuePartialParameters({
                    age : Type('string'),
                    hobby : Type('string'),
                    no : Type('string'),
                }, (v)=>And(v), MessageMap)
            };

            let property = ValuePartialParameters(
                validator,
                (v)=>And(v),
                MessageMap
            );

            let validatable = property(value);

            expect(validatable.valid).toBe(true);
            expect(validatable.value).toBe(value);

            if(validatable.validatables.name) {

                expect(validatable.validatables.name.valid).toBe(true);
                expect(typeof validatable.validatables.name.message).toBe('string');

            } else {

                fail('validatable.validatables.name should exist');
            }


            if(validatable.validatables.address) {

                expect(validatable.validatables.address.valid).toBe(true);
                expect(typeof validatable.validatables.address.message).toBe('string');

            } else {

                fail('validatable.validatables.address should exist');
            }


            if(validatable.validatables.user) {

                expect(validatable.validatables.user.valid).toBe(true);
                expect(typeof validatable.validatables.user.message).toBe('string');

            } else {

                fail('validatable.validatables.user should exist');
            }

            if(validatable.validatables.info) {

                expect(validatable.validatables.info.valid).toBe(true);
                expect(validatable.validatables.info.value).toBe(value);

                // @ts-expect-error
                expect(validatable.validatables.info.validatables.age.valid).toBe(true);
                // @ts-expect-error
                expect(typeof validatable.validatables.info.validatables.age.message).toBe('string');

                // @ts-expect-error
                expect(validatable.validatables.info.validatables.hobby.valid).toBe(true);
                // @ts-expect-error
                expect(typeof validatable.validatables.info.validatables.hobby.message).toBe('string');

                // @ts-expect-error
                expect(validatable.validatables.info.validatables.no.valid).toBe(true);
                // @ts-expect-error
                expect(typeof validatable.validatables.info.validatables.no.message).toBe('string');


            } else {

                fail('validatable.validatables.info should exist');
            }

        });


        it(`or validation`, () => {

            let validator = {
                name : Type('string'),
                address : Type('string'),
                user : Type('string'),
                info : ValuePartialParameters({
                    age : Type('string'),
                    hobby : Type('string'),
                    no : Type('string'),
                }, (v)=>Or(v), MessageMap)
            };

            let property = ValuePartialParameters(
                validator,
                (v)=>Or(v),
                MessageMap
            );

            let validatable = property(value);

            expect(validatable.valid).toBe(true);
            expect(validatable.value).toBe(value);


            if(validatable.validatables.name) {

                expect(validatable.validatables.name.valid).toBe(true);
                expect(typeof validatable.validatables.name.message).toBe('string');

            } else {

                fail('validatable.validatables.name should exist');
            }


            if(validatable.validatables.address) {

                expect(validatable.validatables.address.valid).toBe(true);
                expect(typeof validatable.validatables.address.message).toBe('string');

            } else {

                fail('validatable.validatables.address should exist');
            }


            if(validatable.validatables.user) {

                expect(validatable.validatables.user.valid).toBe(true);
                expect(typeof validatable.validatables.user.message).toBe('string');

            } else {

                fail('validatable.validatables.user should exist');
            }

            if(validatable.validatables.info) {

                expect(validatable.validatables.info.valid).toBe(true);
                expect(validatable.validatables.info.value).toBe(value);

                // @ts-expect-error
                expect(validatable.validatables.info.validatables.age.valid).toBe(true);
                // @ts-expect-error
                expect(typeof validatable.validatables.info.validatables.age.message).toBe('string');

                // @ts-expect-error
                expect(validatable.validatables.info.validatables.hobby.valid).toBe(true);
                // @ts-expect-error
                expect(typeof validatable.validatables.info.validatables.hobby.message).toBe('string');

                // @ts-expect-error
                expect(validatable.validatables.info.validatables.no.valid).toBe(true);
                // @ts-expect-error
                expect(typeof validatable.validatables.info.validatables.no.message).toBe('string');


            } else {

                fail('validatable.validatables.info should exist');
            }
        });


    });


    describe('mixed', function() {



        it(`and validation`, () => {

            let validator = {
                name : Type('string'),
                age : Type('number'),
                address : Type('string'),
                info : ValuePartialParameters({
                    age : Type('string'),
                    hobby : Type('number'),
                    no : Type('string'),
                }, (v)=>And(v), MessageMap)
            };

            let property = ValuePartialParameters(
                validator,
                (v)=>And(<Record<PropertyKey, Validatable>>v), MessageMap
            );

            let and = property('data');

            expect<boolean>(and.valid).toBe(false);
            expect(and.value).toBe('data');

            if(and.validatables.name) {
                expect(and.validatables.name.valid).toBe(true);
                expect(typeof and.validatables.name.message).toBe('string');

            } else {
                fail('validatable.validatables.name should exist');
            }

            if(and.validatables.age) {
                expect(and.validatables.age.valid).toBe(false);
                expect(typeof and.validatables.age.message).toBe('string');

            } else {
                fail('validatable.validatables.age should exist');
            }

            if(and.validatables.address) {
                fail('validatable.validatables.address should exist');
            }

            if(and.validatables.info) {
                fail('validatable.validatables.info should exist');
            }
        });


        it(`or validation `, () => {

            let validator = {
                name : Type('string'),
                age : Type('number'),
                address : Type('string'),
                info : ValuePartialParameters({
                    age : Type('string'),
                    hobby : Type('number'),
                    no : Type('string'),
                }, (v)=>Or(v), MessageMap)
            };

            let property = ValuePartialParameters(
                validator,
                (v)=>Or(<Record<PropertyKey, Validatable>>v), MessageMap
            );
            //
            // property.validation = (v)=>Or(<Record<PropertyKey, Validatable>>v);
            // property.validators.info.validation = (v)=>Or(v);

            let or = property('data');
            expect(or.value).toBe('data');
            expect(or.valid).toBe(true);

            if(or.validatables.name) {
                expect(typeof or.validatables.name.message).toBe('string');
                expect(or.validatables.name.valid).toBe(true);
            } else {
                fail('validatable.validatables.name should exist');
            }

            if(or.validatables.age) {
                expect(typeof or.validatables.age.message).toBe('string');
                expect(or.validatables.age.valid).toBe(false);
            } else {
                fail('validatable.validatables.age should exist');
            }

            if(or.validatables.address) {
                fail('validatable.validatables.address should exist');
            }

            if(or.validatables.info) {

                fail('validatable.validatables.info should exist');
            }

        });
    });


    describe('all invalid', function() {


        it(`and validation`, () => {

            let validator = {
                name : Type('string'),
                age : Type('number'),
                address : Type('string'),
                info : ValuePartialParameters({
                    age : Type('string'),
                    hobby : Type('number'),
                    no : Type('string'),
                }, And, MessageMap)
            };


            let property = ValuePartialParameters(
                validator,
                (v)=>And(<Record<PropertyKey, Validatable>>v),
                MessageMap
            );

            let and = property({});

            expect<boolean>(and.valid).toBe(false);
            expect(and.value).toEqual({});

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

            if(and.validatables.info) {
                fail('validatable.validatables.info should exist');
            }
        });

        it(`or validation `, () => {


            let validator = {
                name : Type('string'),
                age : Type('number'),
                address : Type('string'),
                info : ValuePartialParameters({
                    age : Type('string'),
                    hobby : Type('number'),
                    no : Type('string'),
                }, (v)=>Or(v), MessageMap)
            };


            let property = ValuePartialParameters(
                validator,
                (v)=>Or(<Record<PropertyKey, Validatable>>v),
                MessageMap
            );


            let or = property({});

            expect(or.value).toEqual({});
            expect<boolean>(or.valid).toBe(false);

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

                fail('validatable.validatables.info should exist');
            }

        });
    });
});


