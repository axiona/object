import Empty from "../../dist/validatable/empty";
import EmptyMessage from "../../dist/validatable/string/empty";
import Name from "../../dist/string/name";

it("enable console log", () => { spyOn(console, 'log').and.callThrough()});


let map = new Map<object, [boolean, string]>();

map.set({}, [true, 'empty object']);
map.set({a:1}, [false, 'not empty object']);
map.set([], [false, 'array']);

for(let [value, [valid, message]] of map) {

    describe('empty', () => {

        it(message, ()=>{

            let validatable = new Empty(value, true, EmptyMessage);
            expect(validatable.valid).toBe(valid, value);
            expect(validatable.value).toBe(value, value);

            if(validatable.valid) {
                expect(validatable.message).toBe(`value "${Name(value)}" is empty object`);
            } else {
                expect(validatable.message).toBe(`value "${Name(value)}" is not empty object`);
            }
        });

    });

    describe('not empty', () => {

        it(message, ()=>{

            let validatable = new Empty(value, false, EmptyMessage);
            expect(validatable.valid).toBe(!valid, value);
            expect(validatable.value).toBe(value, value);

            if(validatable.valid) {
                expect(validatable.message).toBe(`value "${Name(value)}" is empty object`);
            } else {
                expect(validatable.message).toBe(`value "${Name(value)}" is not empty object`);
            }
        });
    });

}


