import { IBasePlugin, IChapter, ICompleteNovel, INovel, INovelList } from "../plugin";
import fetch from "node-fetch";
import cherrio from 'cheerio';
import Logger from '../logger';

export class BiQuGePlugin implements IBasePlugin {
    HTTP = new URL("https://www.biquge.com.cn/");
    HTTPSearch = new URL("/search.php",this.HTTP);

    async GetList(search?: string,page: number = 1): Promise<INovelList>{
        Logger.info(`读取小说列表,搜索${search}的第${page}页`);

        let url = new URL(this.HTTPSearch.toString());
        url.searchParams.set("q",search);
        url.searchParams.set("p",String(page));

        let data = await fetch(url,{
            method: "GET"
        })

        let htmldata = await data.text();

        let html = cherrio.load(htmldata);

        let vlist: INovel[] = [];

        html('.result-list>.result-item').each((index,e) => {
            let vdata:INovel = {
                title: html("a.result-game-item-title-link",e).attr('title'),
                url: html("a.result-game-item-title-link",e).attr('href'),
                introduce: html(".result-game-item-desc",e).text()
            }
            Logger.debug(`读取小说:《${vdata.title}》`);
            vlist.push(vdata);
        })
        let maxpage = Number(new URL(html(`div.search-result-page-main>a`).last().attr('href'),this.HTTPSearch).searchParams.get('p'));

        Logger.info(`读取了共${vlist.length}本小说`);
        Logger.debug(`第${page}页,共${maxpage}页`)

        return {
            maxpage,
            current: page,
            novels: vlist
        };
    }

    async GetNovel(novel: INovel): Promise<ICompleteNovel>{
        Logger.info(`获取小说目录：${novel.title}`);
        let url = new URL(novel.url,this.HTTP);

        let data = await fetch(url);
        let htmldata = await data.text();

        let html = cherrio.load(htmldata);
        let chapters: IChapter[] = []

        html("#list>dl>dd").each((index,e) => {
            let chapter: IChapter = {
                number: index,
                url: html("a",e).attr("href"),
                title: html("a",e).text()
            }
            Logger.debug(`获取小说目录：${chapter.title}`);
            chapters.push(chapter);
        });

        let r = Object.assign(novel,{chapter: chapters})
        Logger.info(`获取完成，一共有${r.chapter.length}个章节`)
        Logger.debug(r);
        return r;
    }
    async GetContent(chapter: IChapter): Promise<string>{
		Logger.info(`获取小说${chapter.title}`);
		let url = new URL(chapter.url,this.HTTP);

		let data = await fetch(url);
		let htmldata = await data.text();
		let html = cherrio.load(htmldata);

		let text = html("#content").text();

		Logger.info(`获取完毕，共${text.length}字`);
        return text;
    }
}
