(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Omit(object, ...keys) {
        let result = {};
        for (let [property, value] of Object.entries(object)) {
            if (keys.includes(property)) {
                continue;
            }
            result[property] = value;
        }
        return result;
    }
    exports.default = Omit;
});
//# sourceMappingURL=omit.js.map