import { IBasePlugin, IBaseSource, IChapter, ICompleteNovel, INovel, IPluginInitReturn, ISearchNovel, ISearchNovelList, ISourceChapter } from "../plugin";
import fetch from "node-fetch";
import cherrio from 'cheerio';
import Logger from '../logger';
import { RobberEngine } from '../core';

/**
 * 内置的部分盗版小说源
 */
export class BuiltPlugin implements IBasePlugin {
	async InitPlugin(core: RobberEngine): Promise<IPluginInitReturn> {
		core.RegisterSource("笔趣阁", new BiQuGeSource())

		return {
			title: "内置插件"
		}
	}
}

class BiQuGeSource implements IBaseSource {
	HTTP = new URL("https://www.biquge.com.cn/");
	HTTPSearch = new URL("/search.php", this.HTTP);

	async GetList(search?: string, page: number = 1): Promise<ISearchNovelList> {
		Logger.info(`读取小说列表,搜索${search}的第${page}页`);

		let urls = new URL(this.HTTPSearch.toString());
		urls.searchParams.set("q", search);
		urls.searchParams.set("p", String(page));

		let data = await fetch(urls, {
			method: "GET"
		})

		let htmldata = await data.text();

		let html = cherrio.load(htmldata);

		let vlist: ISearchNovel[] = [];

		html('.result-list>.result-item').each((index, e) => {
			let vdata: ISearchNovel = {
				title: html("a.result-game-item-title-link", e).attr('title'),
				url: html("a.result-game-item-title-link", e).attr('href'),
				introduce: html(".result-game-item-desc", e).text()
			}
			Logger.debug(`读取小说:《${vdata.title}》`);
			vlist.push(vdata);
		})
		let maxpage = Number(new URL(html(`div.search-result-page-main>a`).last().attr('href'), this.HTTPSearch).searchParams.get('p'));

		Logger.info(`读取了共${vlist.length}本小说`);
		Logger.debug(`第${page}页,共${maxpage}页`)

		return {
			maxpage,
			current: page,
			novels: vlist
		};
	}

	async GetNovel(url: string): Promise<IChapter[]> {
		let urls = new URL(url, this.HTTP);

		let data = await fetch(urls);
		let htmldata = await data.text();

		let html = cherrio.load(htmldata);
		let chapters: IChapter[] = []

		html("#list>dl>dd").each((index, e) => {
			let chapter: IChapter = {
				number: index,
				url: html("a", e).attr("href"),
				title: html("a", e).text()
			}
			Logger.debug(`获取小说目录：${chapter.title}`);
			chapters.push(chapter);
		});

		Logger.info(`获取完成，一共有${chapters.length}个章节`)

		return chapters;
	}

	async GetContent(url: string): Promise<string> {
		let urls = new URL(url, this.HTTP);

		let data = await fetch(urls);
		let htmldata = await data.text();
		let html = cherrio.load(htmldata);

		let text = html("#content").text();

		Logger.info(`获取完毕，共${text.length}字`);
		return text;
	}
}
