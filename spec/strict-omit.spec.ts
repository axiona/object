import StrictOmit from '../dist/strict-omit.js';
import {Omit as UtilityTypesOmit} from 'utility-types';
import {Object} from 'ts-toolbelt';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

interface Test {

    string : string;
    boolean : boolean;
    number : number;
}


it('compiler compatibility', function () {

    let member : StrictOmit<Test, 'string'>;
    let members : StrictOmit<Test, 'string'|'boolean'>;

    // @ts-expect-error
    let nonmember : StrictOmit<Test, 'non'>;
    // @ts-expect-error
    let nonmembers : StrictOmit<Test, 'non'|'non2'>;

    const withValue : StrictOmit<Test, 'string'> = {
        boolean : true,
        number : 1,
    };

});

it('utility types compiler compatibility', function () {

    let member : UtilityTypesOmit<Test, 'string'>;
    let members : UtilityTypesOmit<Test, 'string'|'boolean'>;

    let nonmember : UtilityTypesOmit<Test, 'non'>;
    let nonmembers : UtilityTypesOmit<Test, 'non'|'non2'>;

    const withValue : UtilityTypesOmit<Test, 'string'> = {
        boolean : true,
        number : 1,
    };

});

it('ts toolbelt compiler compatibility', function () {

    let member : Object.Omit<Test, 'string'>;
    let members : Object.Omit<Test, 'string'|'boolean'>;

    let nonmember : Object.Omit<Test, 'non'>;
    let nonmembers : Object.Omit<Test, 'non'|'non2'>;

    const withValue : Object.Omit<Test, 'string'> = {
        boolean : true,
        number : 1,
    };

});

it('native compiler compatibility', function () {

    let member : globalThis.Omit<Test, 'string'>;
    let members : globalThis.Omit<Test, 'string'|'boolean'>;

    let nonmember : globalThis.Omit<Test, 'non'>;
    let nonmembers : globalThis.Omit<Test, 'non'|'non2'>;

    const withValue : globalThis.Omit<Test, 'string'> = {
        boolean : true,
        number : 1,
    };

});

