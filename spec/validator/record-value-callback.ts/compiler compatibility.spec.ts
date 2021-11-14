import ValidatorInterface from "@dikac/t-validator/simple";
import Instance from "@dikac/t-validator/validatable/dynamic";
import RecordValueCallback from "../../../dist/validator/record-value-callback";
import ValidateValue from "../../../dist/validator/validatable/record/record-value";
import And from "../../../dist/validatable/and";
import MessageMap from "../../../dist/message/message/record/map";
import Validatable from "@dikac/t-validatable/validatable";
import ValidateValuePartial from "../../../dist/validator/validatable/record/record-value-partial";
import Message from "@dikac/t-message/message";
import Type from "@dikac/t-type/validator/type";

it("force console log", () => { spyOn(console, 'log').and.callThrough();});

type TypeValidatorValue = ValidatorInterface<unknown, string, Instance<unknown, string>>;

let validator = Type.Parameters("string");

type Type = {
    name : string,
    address : string,
}

let value = {
    name : 'name',
    address : 'address',
};

describe("implicit", function() {

    let property = RecordValueCallback.Parameters(validator, ValidateValue.Parameters, And, (v)=>MessageMap(v));

    let validatable = property(value);

    if(validatable.valid) {

        let string : Type = validatable.value;

    } else {

        let unknown : unknown = validatable.value;
    }

});

describe("explicit complete", function() {

    describe("auto", function() {

        let property = RecordValueCallback.Parameters<TypeValidatorValue>(validator,
            (value, validators) => ValidateValue.Parameters(value, validators),
            (v)=>And(v),
            MessageMap
        );

        let validatable = property(value);

        let unknown : unknown = validatable.value;
        let record : Type = validatable.value;

    });

    describe("direct", function() {

        let property = RecordValueCallback.Parameters<TypeValidatorValue>(validator,
            (value, validators) => ValidateValue.Parameters(value, validators),
            (v)=>And(<globalThis.Record<any, Validatable>>v),
            MessageMap
        );

        let validatable = property(value);

        let unknown : unknown = validatable.value;
        let record : Type = validatable.value;

    });
});

describe("implicit partial", function() {

    let property = RecordValueCallback.Parameters(validator,
        (value, validators) =>
            <Record<PropertyKey, Instance<any, string>>>ValidateValuePartial.Parameters(value, validators),
        (v)=>And(<globalThis.Record<PropertyKey, Validatable>>v),
        MessageMap
    );

    let validatable = property(value);

    let unknown : unknown = validatable.value;
    let val : Type = validatable.value;

});

describe("explicit complete", function() {

    describe("auto", function() {

        let property = RecordValueCallback.Parameters<TypeValidatorValue>(
            validator,
            (value, validators) =>
                <Record<PropertyKey, Instance<any, string>>>ValidateValuePartial.Parameters(value, validators),
            (v)=>And(<globalThis.Record<any, Validatable>>v),
            MessageMap
        );

        let validatable = property(value);

        let unknown : unknown = validatable.value;
        let string : Type = validatable.value;

    });

    describe("direct", function() {

        let property = RecordValueCallback.Parameters<TypeValidatorValue>(
            validator,
            (value, validators) =>
                <Record<PropertyKey, Instance<any, string>>>ValidateValuePartial.Parameters(value, validators),
            (v)=>And(<globalThis.Record<any, Validatable>>v),
            (v)=>MessageMap(<globalThis.Record<any, Message>>v)
        );

        let validatable = property(value);

        let unknown : unknown = validatable.value;
        let string : Type = validatable.value;

    });
});



