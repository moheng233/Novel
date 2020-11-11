"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobberEngine = void 0;
const tslib_1 = require("tslib");
const lowdb_1 = tslib_1.__importDefault(require("lowdb"));
const FileSync_1 = tslib_1.__importDefault(require("lowdb/adapters/FileSync"));
const path_1 = require("path");
/**
 * 抓取引擎的核心类型
 * 单例类
 */
class RobberEngine {
    constructor() {
        this.PluginsList = [];
        this.Noveldb = lowdb_1.default(new FileSync_1.default(path_1.resolve(__dirname, "../db.json")));
        this.Noveldb.defaults({
            novel: []
        }).write();
    }
    /**
     * 从插件远端获取电子书
     * 并存入数据库
     * @param search 搜索
     */
    RemoteSearchNovel(search) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
    /**
     * 从本地数据库获取电子书
     * @param search 搜索
     */
    LocalSearchNovel(search) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
        });
    }
    /**
     * 加载插件
     * @param plugin 要加载的插件
     */
    LoadPlugin(plugin) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            plugin.InitPlugin(this);
            this.PluginsList.push(plugin);
        });
    }
}
exports.RobberEngine = RobberEngine;
/**
 * 单例模式
 */
RobberEngine.object = new RobberEngine();
//# sourceMappingURL=core.js.map