import { v5 as uuid } from 'uuid';
import Logger from './logger';

import { IBasePlugin, IBaseSource, INovel } from "./plugin";

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

	PluginsList = new Set<IBasePlugin>();
	SourceList = new Map<string,IBaseSource>();

	constructor() {

	}

	async GetSourceList(){

	}

	/**
	 * 从插件远端获取电子书
	 * 并存入数据库
	 * @param search 搜索
	 */
	async RemoteSearchNovel(search: string) {
		return
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
		let DataPlugin = plugin.InitPlugin(this);
		Logger.info(`${(await DataPlugin).title}加载完成`);
		this.PluginsList.add(plugin);
	}

	async RegisterSource(source_name: string,source: IBaseSource){
		this.SourceList.set(source_name,source);
		Logger.info(`${source_name}源被添加`);
	}
}
