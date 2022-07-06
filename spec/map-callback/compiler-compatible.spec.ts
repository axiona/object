import MapCallback from '../../dist/map-callback.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

it('basic', () => {

    let source = {
        number : 1,
        string : 'string',
        boolean : true,
        object : {},
    };

    let map = MapCallback(source, (value)=>'replaced');

    let string : string;
    string = map.number;
    string = map.string;
    string = map.boolean;
    string = map.object;

    //@ts-expect-error
    string = map.r;

});


it('callback parameter', () => {

    let source = {
        number : 1,
        string : 'string',
        boolean : true,
        object : {},
    };

    let map = MapCallback(source, (value, key)=>{

        if(key === 'object') {

            // @ts-ignore
            let object : object = value;
        }

        return 'replaced';
    });


});
