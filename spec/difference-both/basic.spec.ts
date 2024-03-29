import {DifferenceBothParameters} from '../../dist/difference-both.js';
import {TypeEqualParameters} from '@axiona/type/boolean/type-equal.js';


it('force console log', () => { spyOn(console, 'log').and.callThrough();});

describe('basic', function () {

    const target = {
        number : 1,
        string : 'a',
        boolean : true,
    };

    const compare = {
        number : 2,
        object : {}
    };

    it('force console log', () => {

        expect(
            DifferenceBothParameters(target, compare, TypeEqualParameters)
        ).toEqual({
            string : 'a',
            boolean : true,
            object : {}
        });
    });

});
