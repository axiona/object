import {RecordParameters} from '../../dist/boolean/record.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});



describe('valid', function () {


    const data = {
        property1 : 'a',
        property2 : 'b',
        property3 : 'c',
        property4 : 'd',
    };

    const convert : object = data;


    it(`check value`, () => {

        if(RecordParameters<string>(convert,  (v:any) : v is string  => typeof v === 'string')) {

            expect(convert.property1).toBe('a', 'property1');
            expect(convert.property2).toBe('b', 'property2');
            expect(convert.property3).toBe('c', 'property3');
            expect(convert.property4).toBe('d', 'property4');

            convert.property5 = 'e';
        }
    });

});
