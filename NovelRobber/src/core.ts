import Lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { resolve } from 'path';

import { v5 as uuid } from 'uuid';

import { IBasePlugin, IChapter, ICompleteNovel, INovel, INovelList } from "./plugin";

export interface INoveldb {
	novel: INovel[]
}

/**
 * 抓取引擎的核心类型
 * 单例类
 */
export class RobberEngine {
	/**
	 * 单例模式
	 */
	static object = new RobberEngine();

	PluginsList: IBasePlugin[] = [];

	Noveldb = Lowdb(new FileSync<INoveldb>(resolve(__dirname, "../db.json")));

	constructor() {
		this.Noveldb.defaults<{ novel: INovel[] }>({
			novel: []
		}).write();
	}

	/**
	 * 从插件远端获取电子书
	 * 并存入数据库
	 * @param search 搜索
	 */
	async RemoteSearchNovel(search: string) {

	}

	/**
	 * 从本地数据库获取电子书
	 * @param search 搜索
	 */
	async LocalSearchNovel(search: string) {

	}

	/**
	 * 加载插件
	 * @param plugin 要加载的插件
	 */
	async LoadPlugin(plugin: IBasePlugin) {
		plugin.InitPlugin(this);
		this.PluginsList.push(plugin);
	}
}
