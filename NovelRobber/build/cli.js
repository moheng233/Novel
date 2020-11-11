#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const figlet_1 = tslib_1.__importDefault(require("figlet"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const logger_1 = tslib_1.__importDefault(require("./logger"));
const path_1 = require("path");
const epub_gen_1 = tslib_1.__importDefault(require("epub-gen"));
const async_1 = tslib_1.__importDefault(require("async"));
const BiQuGe_1 = require("./plugin/BiQuGe");
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log(figlet_1.default.textSync("NovelRobber", "Ghost"));
    let { search } = yield inquirer_1.default.prompt([
        {
            type: "input",
            name: "search",
            message: "要搜索的书名"
        }
    ]);
    let nr = new BiQuGe_1.BiQuGePlugin();
    if (search != "") {
        let page = 1;
        let novel;
        while (true) {
            let nlist = yield nr.GetList(search, page);
            let data = yield inquirer_1.default.prompt({
                type: "list",
                message: "搜索到的书",
                name: "select",
                choices: (r) => {
                    let novels = nlist.novels;
                    let list = [];
                    for (let d of novels) {
                        list.push(d.title);
                    }
                    if (nlist.maxpage > nlist.current) {
                        list.push("下一页");
                    }
                    return list;
                }
            });
            if (data.select != "下一页") {
                novel = nlist.novels.find((e) => {
                    return e.title === data.select;
                });
                break;
            }
            page += 1;
        }
        let cnovel = yield nr.GetNovel(novel);
        logger_1.default.info(`你选择了《${cnovel.title}》`);
        logger_1.default.info(`简绍：${cnovel.introduce}`);
        logger_1.default.info(`共${cnovel.chapter.length}章`);
        let data = yield inquirer_1.default.prompt({
            type: "list",
            message: "选择",
            name: "select",
            choices: [
                '导出epub格式',
                '直接看！'
            ]
        });
        if (data.select == "导出epub格式") {
            logger_1.default.info(`文件将导出到${path_1.resolve(__dirname, `${cnovel.title}.epub`)}`);
            let contentlist = [];
            yield async_1.default.mapLimit(cnovel.chapter, 10, (task, callback) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                contentlist.push({
                    title: task.title,
                    data: yield nr.GetContent(task)
                });
                callback();
            }));
            logger_1.default.info("爬取完成");
            new epub_gen_1.default({
                title: cnovel.title,
                author: cnovel.author,
                content: contentlist
            }, path_1.resolve(__dirname, `${cnovel.title}.epub`));
        }
    }
    else {
        logger_1.default.error("你这搜索个寂寞?");
    }
}))();
//# sourceMappingURL=cli.js.map