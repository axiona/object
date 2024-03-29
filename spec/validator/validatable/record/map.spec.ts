import {MapParameters} from '../../../../dist/validator/validatable/record/map.js';
import {TypeParameters} from '@axiona/type/validator/type.js';

it('force console log', () => spyOn(console, 'log').and.callThrough());

describe('continue on invalid', function() {

    describe('all valid', function() {

        const validator = {
            validator1 : TypeParameters('number'),
            validator2 : TypeParameters('number'),
        };

        const value = {
            validator1 : 10,
            validator2 : 10,
        };

        const result = MapParameters(value, validator);
        it('match validator1', ()=> expect(result.validator1.valid).toBe(true));
        it('match validator2', ()=> expect(result.validator2.valid).toBe(true));

    });

    describe('all invalid', function() {

        const validator = {
            validator1 : TypeParameters('number'),
            validator2 : TypeParameters('number'),
        };

        const value = {
            validator1 : '10',
            validator2 : 'str',
        };

        const result = MapParameters(value, validator);
        it('match validator1', ()=> expect(result.validator1.valid).toBe(false));
        it('match validator2', ()=> expect(result.validator2.valid).toBe(false));

    });

    describe('mixed', function() {

        const validator = {
            validator1 : TypeParameters('number'),
            validator2 : TypeParameters('number'),
        };

        const value = {
            validator1 : 10,
            validator2 : 'str',
        };

        const result = MapParameters(value, validator);
        it('match validator1', ()=> expect(result.validator1.valid).toBe(true));
        it('match validator2', ()=> expect(result.validator2.valid).toBe(false));

    });
});



describe('extended validatable', function() {

    const validator = {
        validator1 : TypeParameters('number'),
        validator2 : TypeParameters('number'),

        validator4 : TypeParameters('string'),
        validator5 : TypeParameters('string'),

        validator7 : TypeParameters('number'),
        validator8 : TypeParameters('number'),

        validator10 : TypeParameters('string'),
        validator11 : TypeParameters('string')
    };

    const value = {
        validator1 : 10,
        validator2 : 10,

        validator4 : 'str',
        validator5 : 'str',

        validator7 : 10,
        validator8 : 'str',

        validator10 : 'str',
        validator11 : 10,
    };

    const result = MapParameters(value, validator);

    it('match validator1', ()=> expect(result.validator1.valid).toBe(true));
    it('match validator1', ()=> expect(typeof result.validator1.message).toBe('string'));
    it('match validator1', ()=> expect(result.validator1.value).toBe(10));

    it('match validator2', ()=> expect(result.validator2.valid).toBe(true));
    it('match validator2', ()=> expect(typeof result.validator2.message).toBe('string'));
    it('match validator2', ()=> expect(result.validator2.value).toBe(10));

    it('match validator4', ()=> expect(result.validator4.valid).toBe(true));
    it('match validator4', ()=> expect(typeof result.validator4.message).toBe('string'));
    it('match validator4', ()=> expect(result.validator4.value).toBe('str'));

    it('match validator5', ()=> expect(result.validator5.valid).toBe(true));
    it('match validator5', ()=> expect(typeof result.validator5.message).toBe('string'));
    it('match validator5', ()=> expect(result.validator5.value).toBe('str'));

    it('match validator7', ()=> expect(result.validator7.valid).toBe(true));
    it('match validator7', ()=> expect(typeof result.validator7.message).toBe('string'));
    it('match validator7', ()=> expect(result.validator7.value).toBe(10));

    it('match validator8', ()=> expect(result.validator8.valid).toBe(false));
    it('match validator8', ()=> expect(typeof result.validator8.message).toBe('string'));
    it('match validator8', ()=> expect(result.validator8.value).toBe('str'));

    it('match validator10', ()=> expect(result.validator10.valid).toBe(true));
    it('match validator10', ()=> expect(typeof result.validator10.message).toBe('string'));
    it('match validator10', ()=> expect(result.validator10.value).toBe('str'));

    it('match validator11', ()=> expect(result.validator11.valid).toBe(false));
    it('match validator11', ()=> expect(typeof result.validator11.message).toBe('string'));
    it('match validator11', ()=> expect(result.validator11.value).toBe(10));


});
