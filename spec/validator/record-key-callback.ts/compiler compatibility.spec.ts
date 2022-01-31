import ValidatorInterface from '@alirya/validator/simple';
import Instance from '@alirya/validator/validatable/validatable';
import RecordValueCallback from '../../../dist/validator/record-key-callback-parameters';
import ValidateKey from '../../../dist/validator/validatable/record/record-key-parameters';
import And from '../../../dist/validatable/and';
import MessageMap from '../../../dist/message/message/record/map';
import ValidatorValidatable from '@alirya/validator/validatable/validatable';
import Validatable from '@alirya/validatable/validatable';
import ValidateValuePartial from '../../../dist/validator/validatable/record/record-key-partial-parameters';
import Type from '@alirya/type/validator/type-parameters';

it('force console log', () => { spyOn(console, 'log').and.callThrough();});

describe('compiler compatibility', function() {

    type TypeValidatorValue = ValidatorInterface<unknown, string, Instance<unknown, string>>;

    let validator = Type('string');

    type Type = {
        name : string,
        address : string,
    };

    let value = {
        name : 'name',
        address : 'address',
    };

    it('implicit', function() {

        let property = RecordValueCallback(validator, ValidateKey, And, (v)=>MessageMap(v));

        let validatable = property(value);

        if(validatable.valid) {

            let string : Type = validatable.value;

        } else {

            let unknown : unknown = validatable.value;
        }

    });

    describe('explicit complete', function() {

        it('auto', function() {

            let property = RecordValueCallback<TypeValidatorValue>(validator,
                (value, validators) => ValidateKey(value, validators),
                (v)=>And(v),
                (v)=>MessageMap(<globalThis.Record<any, ValidatorValidatable>>v)
            );

            let validatable = property(value);

            let unknown : unknown = validatable.value;
            let record : Type = validatable.value;

        });

        it('direct', function() {

            let property = RecordValueCallback<TypeValidatorValue>(validator,
                (value, validators) => ValidateKey(value, validators),
                (v)=>And(<globalThis.Record<any, Validatable>>v),
                (v)=>MessageMap(<globalThis.Record<any, ValidatorValidatable>>v)
            );

            let validatable = property(value);

            let unknown : unknown = validatable.value;
            let record : Type = validatable.value;

        });
    });

    it('implicit partial', function() {

        let property = RecordValueCallback(validator,
            (value, validators) =>
                <Record<PropertyKey, Instance<any, string>>>ValidateValuePartial(value, validators),
            (v)=>And(<globalThis.Record<PropertyKey, Validatable>>v),
            MessageMap
        );

        let validatable = property(value);

        let unknown : unknown = validatable.value;
        let val : Type = validatable.value;

    });

    describe('explicit complete', function() {

        it('auto', function() {

            let property = RecordValueCallback<TypeValidatorValue>(
                validator,
                (value, validators) =>
                    <Record<PropertyKey, Instance<any, string>>>ValidateValuePartial(value, validators),
                (v)=>And(<globalThis.Record<any, ValidatorValidatable>>v),
                (v)=>MessageMap(<globalThis.Record<any, ValidatorValidatable>>v)
            );

            let validatable = property(value);

            let unknown : unknown = validatable.value;
            let string : Type = validatable.value;

        });

        it('direct', function() {

            let property = RecordValueCallback<TypeValidatorValue>(
                validator,
                (value, validators) =>
                    <Record<PropertyKey, Instance<any, string>>>ValidateValuePartial(value, validators),
                (v)=>And(<globalThis.Record<any, ValidatorValidatable>>v),
                (v)=>MessageMap(<globalThis.Record<any, ValidatorValidatable>>v)
            );

            let validatable = property(value);

            let unknown : unknown = validatable.value;
            let string : Type = validatable.value;

        });
    });
});
