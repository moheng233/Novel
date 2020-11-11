"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobberEngine = void 0;
const tslib_1 = require("tslib");
/**
 * 抓取引擎的核心类型
 * 单例类
 */
class RobberEngine {
    constructor() {
        this.PluginsList = [];
        // @TODO
    }
    GetList(search, page = 1) {
        throw new Error('Method not implemented.');
    }
    GetNovel(novel) {
        throw new Error('Method not implemented.');
    }
    GetContent(chapter) {
        throw new Error('Method not implemented.');
    }
    /**
     * 加载插件
     * @param plugin 要加载的插件
     */
    LoadPlugin(plugin) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.PluginsList.push(plugin);
        });
    }
}
exports.RobberEngine = RobberEngine;
/**
 * 单例模式
 */
RobberEngine.object = new RobberEngine();
//# sourceMappingURL=main.js.map