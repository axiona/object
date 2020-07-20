(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../validatable/recursive/map", "../../validatable/recursive/boolean/and"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const map_1 = require("../../validatable/recursive/map");
    const and_1 = require("../../validatable/recursive/boolean/and");
    class Record {
        constructor(validators) {
            this.validators = validators;
        }
        validate(argument) {
            let results = map_1.default(this.validators, argument, false);
            return {
                validatable: results,
                value: argument,
                valid: and_1.default(results)
            };
        }
    }
    exports.default = Record;
});
//# sourceMappingURL=record.js.map