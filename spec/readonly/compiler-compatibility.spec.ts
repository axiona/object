import {ReadonlyPropertiesReturn} from '../../dist/readonly.js';

it('enable console log', () => spyOn(console, 'log').and.callThrough());

describe('partial', () => {

    it('test', () => {

        const source = {
            number : 1,
            string : 'a',
            boolean : true,
            object : {},
        };

        const readonly : ReadonlyPropertiesReturn<['number', 'boolean'], typeof source> = source;


        // @ts-expect-error
        readonly.number = 1;

        // @ts-expect-error
        readonly.boolean = true;

        readonly.string = 'a';
        readonly.object = {};
    });
});
