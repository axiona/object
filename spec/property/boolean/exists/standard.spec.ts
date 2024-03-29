import {ExistsParameters} from '../../../../dist/property/boolean/exists.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});


it(`native method`, () => {

    expect(ExistsParameters([], 'splice')).toBe(true);
});

it(`method`, () => {

    class Class {

        constructor(public test: number) {
        }
    }

    const object =  new Class(1);
    expect(ExistsParameters(object, 'test')).toBe(true);
});

it(`property`, () => {

    const object =  {
        test : 1
    };
    expect(ExistsParameters(object, 'test')).toBe(true);
});

it(`getter`, () => {

    class Getter {
        get test () { return 1; }
    }
    expect(ExistsParameters(new Getter(), 'test')).toBe(true);
});

it(`setter`, () => {

    class Setter {
        set test (value) {}
    }
    expect(ExistsParameters(new Setter(), 'test')).toBe(true);
});

it(`implicit undefined`, () => {

    const test =  {
        test : undefined
    };
    expect(ExistsParameters(test, 'test')).toBe(true);
});

it(`not exist`, () => {

    const test =  {
    };
    expect(ExistsParameters(test, 'test')).toBe(false);
});


it(`symbol`, () => {

    expect(ExistsParameters(new Map(), Symbol.iterator)).toBe(true);
});


