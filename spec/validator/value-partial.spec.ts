import Value from "../../dist/validator/value-partial";
import And from "../../dist/validatable/and";
import Or from "../../dist/validatable/or";
import Validatable from "@dikac/t-validatable/validatable";
import MessageMap from "../../dist/message/message/record/map";
import Type from "@dikac/t-type/validator/type";
import Message from "@dikac/t-message/message";


it("force console log", () => { spyOn(console, 'log').and.callThrough();});

describe("compiler compatibility", function() {

    let validator = {
        name : Type.Parameters('string'),
        address : Type.Parameters('string'),
    };

    describe("implicit partial", function() {

        let property = Value.Parameters(validator, And, MessageMap);

        let validatable = property('data');

        let unknown : unknown = validatable.value;

        let string : string = validatable.value;

    });

    describe("explicit complete", function() {

        let property = Value.Parameters<string, string, {name : string, address : string}, typeof validator>(validator,
            And,
            (v)=><{name : string, address : string}>MessageMap(<{name : Message<string>, address : Message<string>}>v)
        );

        let validatable = property('data');


        let unknown : unknown = validatable.value;
        let string : string = validatable.value;

    });
});

describe("implicit incomplete", function() {

    describe("all valid", function() {

        let value = 'data';

        it(`and validation`, () => {

            let validator = {
                name : Type.Parameters('string'),
                address : Type.Parameters('string'),
                user : Type.Parameters('string'),
            };

            let property = Value.Parameters(
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
                name : Type.Parameters('string'),
                address : Type.Parameters('string'),
                user : Type.Parameters('string'),
            };

            let property = Value.Parameters(
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


    describe("mixed", function() {

        it(`and validation`, () => {

            let validator = {
                name : Type.Parameters('string'),
                age : Type.Parameters('number'),
                address : Type.Parameters('string'),
            };

            let property = Value.Parameters(
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
                name : Type.Parameters('string'),
                age : Type.Parameters('number'),
                address : Type.Parameters('string'),
            };

            let property = Value.Parameters(
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


    describe("all invalid", function() {


        it(`and validation`, () => {

            let validator = {
                name : Type.Parameters('string'),
                age : Type.Parameters('number'),
                address : Type.Parameters('string'),
            };


            let property = Value.Parameters(
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
                name : Type.Parameters('string'),
                age : Type.Parameters('number'),
                address : Type.Parameters('string'),
            };


            let property = Value.Parameters(
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



describe("recursive", function() {

    describe("all valid", function() {

        let value = 'data';

        it(`and validation`, () => {

            let validator = {
                name : Type.Parameters('string'),
                address : Type.Parameters('string'),
                user : Type.Parameters('string'),
                info : Value.Parameters({
                    age : Type.Parameters('string'),
                    hobby : Type.Parameters('string'),
                    no : Type.Parameters('string'),
                }, (v)=>And(v), MessageMap)
            };

            let property = Value.Parameters(
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
                name : Type.Parameters('string'),
                address : Type.Parameters('string'),
                user : Type.Parameters('string'),
                info : Value.Parameters({
                    age : Type.Parameters('string'),
                    hobby : Type.Parameters('string'),
                    no : Type.Parameters('string'),
                }, (v)=>Or(v), MessageMap)
            };

            let property = Value.Parameters(
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


    describe("mixed", function() {



        it(`and validation`, () => {

            let validator = {
                name : Type.Parameters('string'),
                age : Type.Parameters('number'),
                address : Type.Parameters('string'),
                info : Value.Parameters({
                    age : Type.Parameters('string'),
                    hobby : Type.Parameters('number'),
                    no : Type.Parameters('string'),
                }, (v)=>And(v), MessageMap)
            };

            let property = Value.Parameters(
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
                name : Type.Parameters('string'),
                age : Type.Parameters('number'),
                address : Type.Parameters('string'),
                info : Value.Parameters({
                    age : Type.Parameters('string'),
                    hobby : Type.Parameters('number'),
                    no : Type.Parameters('string'),
                }, (v)=>Or(v), MessageMap)
            };

            let property = Value.Parameters(
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


    describe("all invalid", function() {


        it(`and validation`, () => {

            let validator = {
                name : Type.Parameters('string'),
                age : Type.Parameters('number'),
                address : Type.Parameters('string'),
                info : Value.Parameters({
                    age : Type.Parameters('string'),
                    hobby : Type.Parameters('number'),
                    no : Type.Parameters('string'),
                }, And, MessageMap)
            };


            let property = Value.Parameters(
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
                name : Type.Parameters('string'),
                age : Type.Parameters('number'),
                address : Type.Parameters('string'),
                info : Value.Parameters({
                    age : Type.Parameters('string'),
                    hobby : Type.Parameters('number'),
                    no : Type.Parameters('string'),
                }, (v)=>Or(v), MessageMap)
            };


            let property = Value.Parameters(
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


