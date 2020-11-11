"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiQuGePlugin = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const cheerio_1 = tslib_1.__importDefault(require("cheerio"));
const logger_1 = tslib_1.__importDefault(require("../logger"));
class BiQuGePlugin {
    constructor() {
        this.HTTP = new URL("https://www.biquge.com.cn/");
        this.HTTPSearch = new URL("/search.php", this.HTTP);
    }
    GetList(search, page = 1) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`读取小说列表,搜索${search}的第${page}页`);
            let url = new URL(this.HTTPSearch.toString());
            url.searchParams.set("q", search);
            url.searchParams.set("p", String(page));
            let data = yield node_fetch_1.default(url, {
                method: "GET"
            });
            let htmldata = yield data.text();
            let html = cheerio_1.default.load(htmldata);
            let vlist = [];
            html('.result-list>.result-item').each((index, e) => {
                let vdata = {
                    title: html("a.result-game-item-title-link", e).attr('title'),
                    url: html("a.result-game-item-title-link", e).attr('href'),
                    introduce: html(".result-game-item-desc", e).text()
                };
                logger_1.default.debug(`读取小说:《${vdata.title}》`);
                vlist.push(vdata);
            });
            let maxpage = Number(new URL(html(`div.search-result-page-main>a`).last().attr('href'), this.HTTPSearch).searchParams.get('p'));
            logger_1.default.info(`读取了共${vlist.length}本小说`);
            logger_1.default.debug(`第${page}页,共${maxpage}页`);
            return {
                maxpage,
                current: page,
                novels: vlist
            };
        });
    }
    GetNovel(novel) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`获取小说目录：${novel.title}`);
            let url = new URL(novel.url, this.HTTP);
            let data = yield node_fetch_1.default(url);
            let htmldata = yield data.text();
            let html = cheerio_1.default.load(htmldata);
            let chapters = [];
            html("#list>dl>dd").each((index, e) => {
                let chapter = {
                    number: index,
                    url: html("a", e).attr("href"),
                    title: html("a", e).text()
                };
                logger_1.default.debug(`获取小说目录：${chapter.title}`);
                chapters.push(chapter);
            });
            let r = Object.assign(novel, { chapter: chapters });
            logger_1.default.info(`获取完成，一共有${r.chapter.length}个章节`);
            logger_1.default.debug(r);
            return r;
        });
    }
    GetContent(chapter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`获取小说${chapter.title}`);
            let url = new URL(chapter.url, this.HTTP);
            let data = yield node_fetch_1.default(url);
            let htmldata = yield data.text();
            let html = cheerio_1.default.load(htmldata);
            let text = html("#content").text();
            logger_1.default.info(`获取完毕，共${text.length}字`);
            return text;
        });
    }
}
exports.BiQuGePlugin = BiQuGePlugin;
//# sourceMappingURL=BiQuGe.js.map