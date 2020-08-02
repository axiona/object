(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../map-callback", "@dikac/t-message/message/value"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const map_callback_1 = require("../../../map-callback");
    const value_1 = require("@dikac/t-message/message/value");
    function Map(record) {
        return map_callback_1.default(record, value_1.default);
    }
    exports.default = Map;
});
//# sourceMappingURL=map.js.map