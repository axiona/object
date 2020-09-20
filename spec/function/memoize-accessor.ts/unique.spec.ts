import MemoizeAccessor from "../../../dist/function/memoize-accessor";
import SetGetter from "../../../dist/value/value/set-getter";
import Unique from "@dikac/t-array/unique";

it("enable console log", () => { spyOn(console, 'log').and.callThrough();});

class Test {

    @MemoizeAccessor()
    get data () : string {
        return Math.random().toString();
    }
}

let tests : Test[] = [
    new Test(),
    new Test(),
    new Test(),
    new Test(),
    new Test(),
];

for(let i = 0; i<=5; i++) {

    it(`check value for difference new instance (${i})`, ()=>{

        let filtered = Unique(tests, ((value1, value2) => value1.data === value2.data));
        expect(filtered.length).toBe(tests.length);

    });
}
