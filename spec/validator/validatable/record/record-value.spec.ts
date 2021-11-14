import Type from "@dikac/t-type/validator/type";
import Record from "../../../../dist/validator/validatable/record/record-value";
import Validator from "@dikac/t-validator/validator";

it("force console log", () => spyOn(console, 'log').and.callThrough());

describe("compiler compatibility", function() {

    describe("explicit valid", function() {

        type ValueValidator = Validator<any, number>;

        type Value = {
            validator1 : number,
            validator2 : number,
        };

        let value : ValueValidator = Type.Parameters("number");

        let record : Value = {
            validator1 : 10,
            validator2 : 10,
        };

        Record.Parameters<Value, ValueValidator>(record, value);
    });

    describe("implicit", function() {

        let value = Type.Parameters("number");

        let record = {
            validator1 : 10,
            validator2 : 10,
        };

        Record.Parameters(record, value);
    });

    describe("auto", function() {

        let value = Type.Parameters("number");

        let record = {
            validator1 : 10,
            validator2 : 10,
        };

        Record.Parameters<typeof record, typeof value>(record, value);
    });
});
