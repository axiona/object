import Value from '../../dist/iterable/pair.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

describe('property', () => {

    const object = {
        data1 : 1,
        data2 : 2,
        data3 : 3,
        data4 : 4,
    };

    it('check result', function () {

        expect([...Value(object)]).toEqual([
            ['data1', 1],
            ['data2', 2],
            ['data3', 3],
            ['data4', 4],
        ]);

    });
});


describe('function', () => {

    const object = {
        function1 : function() {},
        function2 : function() {},
        function3 : function() {},
        function4 : function() {},
    };

    it('check result', function () {

        expect([...Value(object)]).toEqual([
            ['function1', object.function1],
            ['function2', object.function2],
            ['function3', object.function3],
            ['function4', object.function4]
        ]);

    });
});
