(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "is-empty-object"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const IsEmptyObject = require("is-empty-object");
    /**
     * check if object is empty (contain zero property & method)
     */
    function Empty(value, empty = true) {
        return IsEmptyObject(value) === empty;
    }
    exports.default = Empty;
});
//# sourceMappingURL=empty.js.map