import MapCallback from "../../../dist/validator/map-callback";
import ValidateMapPartial from "../../../dist/validator/validatable/record/map-partial";
import And from "../../../dist/validatable/and";
import Or from "../../../dist/validatable/or";
import Validatable from "@dikac/t-validatable/validatable";
import MessageMap from "../../../dist/message/message/record/map";
import Type from "@dikac/t-type/validator/type";
import Instance from "@dikac/t-validator/validatable/dynamic";
import MapCallbackFunction from "../../../dist/validator/map-callback";

it("force console log", () => { spyOn(console, 'log').and.callThrough();});

describe("flat", function() {

    let value = {
        name : 'name',
        age : "15",
        address : 'address',
    };


    it(`and validation`, () => {

        let validator = {
            name : Type.Parameters('string'),
            age : Type.Parameters('number'),
            address : Type.Parameters('string'),
        };

        let property = MapCallback.Parameters(validator,
            (value, validators) => <Record<PropertyKey, Instance<any, string>>>ValidateMapPartial.Parameters(value, validators),
            (v)=>And(<globalThis.Record<PropertyKey, Validatable>>v),
            MessageMap
        );

        let and = property(value);

        expect(and.valid).toBe(false);

        expect(and.value).toEqual(value);

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

        let property = MapCallback.Parameters(validator,
            (value, validators) => <Record<PropertyKey, Instance<any, string>>>ValidateMapPartial.Parameters(value, validators),
            (v)=>Or(<globalThis.Record<PropertyKey, Validatable>>v),
            MessageMap
        );

        let or = property(value);
        expect(or.value).toEqual(value);

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



describe("recursive", function() {

    let value = {
        name : 'name',
        age : "15",
        address : 'address',
        info : {
            age : 5,
            hobby : 'string',
            no : 6,
        }
    };

    it(`and validation`, () => {

        let validator = {
            name : Type.Parameters('string'),
            age : Type.Parameters('number'),
            address : Type.Parameters('string'),
            info : MapCallbackFunction.Parameters({
                    age : Type.Parameters('number'),
                    hobby : Type.Parameters('string'),
                    no : Type.Parameters('number')
                },
                (value, validators) => <Record<PropertyKey, Instance<any, string>>>ValidateMapPartial.Parameters(value, validators),
                (v)=>And(v), MessageMap)
        };

        let property = MapCallback.Parameters(validator,
            (value, validators) => <Record<PropertyKey, Instance<any, string>>>ValidateMapPartial.Parameters(value, validators),
            (v)=>And(<globalThis.Record<PropertyKey, Validatable>>v),
            MessageMap
        );

        let and = property(value);

        expect(and.valid).toBe(false);
        expect(and.value).not.toBe(value);

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

        expect(and.validatables.info).toBe(<any>undefined);
    });


    it(`or validation `, () => {

        let validator = {
            name : Type.Parameters('string'),
            age : Type.Parameters('number'),
            address : Type.Parameters('string'),
            info : MapCallbackFunction.Parameters({
                    age : Type.Parameters('number'),
                    hobby : Type.Parameters('string'),
                    no : Type.Parameters('number')
                },
                (value, validators) => <Record<PropertyKey, Instance<any, string>>>ValidateMapPartial.Parameters(value, validators),
                (v)=>Or(v), MessageMap)
        };

        let property = MapCallback.Parameters(validator,
            (value, validators) => <Record<PropertyKey, Instance<any, string>>>ValidateMapPartial.Parameters(value, validators),
            (v)=>Or(<globalThis.Record<PropertyKey, Validatable>>v),
            MessageMap
        );

        let or = property(value);
        expect(or.value).not.toBe(value);
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

        expect(or.validatables.info).toBe(<any>undefined);

    });

});

