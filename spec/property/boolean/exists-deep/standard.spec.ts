import {ExistsDeepParameters} from '../../../../dist/property/boolean/exists-deep.js';
import {ExistsDeepParameter} from '../../../../dist/property/boolean/exists-deep.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

const object =  {
    a : 1,
    b : {
        a : 1,
        b : 1
    },
    c : {
        c : {
            c : 1
        }
    }
};


describe(`parameters`, () => {

    it(`exists`, () => {

        expect(ExistsDeepParameters(object, 'a', )).toBe(true);
        expect(ExistsDeepParameters(object, 'b', )).toBe(true);
        expect(ExistsDeepParameters(object, 'c', )).toBe(true);

        expect(ExistsDeepParameters(object, 'b', 'a')).toBe(true);
        expect(ExistsDeepParameters(object, 'b', 'b')).toBe(true);
        expect(ExistsDeepParameters(object, 'c', 'c', 'c')).toBe(true);
        expect(ExistsDeepParameters(object, 'c', 'c')).toBe(true);

    });

    it(`not exists`, () => {

        expect(ExistsDeepParameters(object, 'a', 'b')).toBe(false);
        expect(ExistsDeepParameters(object, 'a', 'a')).toBe(false);
        expect(ExistsDeepParameters(object, 'c', 'a')).toBe(false);
    });
});

describe(`parameters`, () => {

    it(`exists`, () => {

        expect(ExistsDeepParameter({object, properties:['a']})).toBe(true);
        expect(ExistsDeepParameter({object, properties:['b']})).toBe(true);
        expect(ExistsDeepParameter({object, properties:['c']})).toBe(true);

        expect(ExistsDeepParameter({object, properties:['b', 'a']})).toBe(true);
        expect(ExistsDeepParameter({object, properties:['b', 'b']})).toBe(true);
        expect(ExistsDeepParameter({object, properties:['c', 'c', 'c']})).toBe(true);
        expect(ExistsDeepParameter({object, properties:['c', 'c']})).toBe(true);


    });

    it(`not exists`, () => {

        expect(ExistsDeepParameter({object, properties:['a', 'b']})).toBe(false);
        expect(ExistsDeepParameter({object, properties:['a', 'a']})).toBe(false);
        expect(ExistsDeepParameter({object, properties:['c', 'a']})).toBe(false);

    });
});


