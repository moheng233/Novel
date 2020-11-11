"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NovelServer = void 0;
const fastify_1 = require("fastify");
const logger_1 = require("./logger");
/**
 * 小说爬虫的Api服务器模块
 */
class NovelServer {
    constructor() {
        this.FASTIFY = fastify_1.fastify({
            logger: logger_1.Logger,
            http2: true,
            ignoreTrailingSlash: true
        });
        this.FASTIFY.listen(3000, '0.0.0.0');
        // @TODO
    }
}
exports.NovelServer = NovelServer;
NovelServer.object = new NovelServer();
//# sourceMappingURL=server.js.map