"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const pino_1 = tslib_1.__importDefault(require("pino"));
exports.Logger = pino_1.default({
    name: "NovelRobber",
    prettyPrint: true,
    level: "info"
});
exports.default = exports.Logger;
//# sourceMappingURL=logger.js.map