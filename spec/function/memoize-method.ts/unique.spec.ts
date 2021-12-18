import MemoizeMethod from "../../../dist/function/memoize-method";
import Unique from "@dikac/t-array/unique-parameters";

it("enable console log", () => { spyOn(console, 'log').and.callThrough();});

class Test {

    get random() : string {
        return Math.random().toString();
    }

    @MemoizeMethod()
    data () : string {
        return this.random;
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

        let filtered = Unique(tests, ((value1, value2) => value1.data() === value2.data()));
        expect(filtered.length).toBe(tests.length);

    });
}
