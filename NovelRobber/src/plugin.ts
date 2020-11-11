import { RobberEngine } from './core';

export interface INovel {
	id: string,
	title: string,
	chapter: ISourceChapter,
	introduce?: string,
	author?: string,
	cover?: string,
	updatetime: string
}

export interface ISearchNovel {
	title: string,
	url: string,
	introduce?: string,
	author?: string,
	cover?: string,
}

export interface ISearchNovelList {
	maxpage: number,
	current: number,
	novels: ISearchNovel[]
}

export interface IChapter {
	title: string,
	number: number,
	url: string
}

export interface ISourceChapter {
	source: string,
	url: string,
	list?: IChapter[]
}

export type ICompleteNovel = INovel & { chapter: IChapter[] };

export interface IPluginInitReturn {
	/**
	 * 插件名称
	 */
	title: string
}

/**
 * 插件基础接口
 */
export interface IBasePlugin {
	/**
	 * 初始化插件
	 * @param core 导出的引擎上下文
	 */
	InitPlugin(core: RobberEngine): Promise<IPluginInitReturn>;
}

export interface IBaseSource {
	/**
	 * 搜索书
	 * @param search 要搜索的书名
	 * @param page 查询页
	 */
	GetList(search?: string, page?: number): Promise<ISearchNovelList>;
	GetNovel(url: string): Promise<IChapter[]>;
	GetContent(url: string): Promise<string>;
}
