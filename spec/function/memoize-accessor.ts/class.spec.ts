import MemoizeAccessor from '../../../dist/function/memoize-accessor.js';

it('enable console log', () => { spyOn(console, 'log').and.callThrough();});

let called = 0;
let result : string;

class Test {

    get random() : string {
        return Math.random().toString();
    }

    @MemoizeAccessor()
    get data () : string {

        called++;
        return this.random;
    }
}

const object = new Test();

it('check initial', ()=>{

    expect(called).toBe(0);

});

it('check value', ()=>{

    result = object.data;
    expect(typeof result).toBe('string');
    expect(called).toBe(1);

});

it('re-check value', ()=>{

    expect(object.data).toBe(result);
    expect(called).toBe(1);

    expect(object.data).toBe(result);
    expect(object.data).toBe(object.data);
    expect(called).toBe(1);

});



