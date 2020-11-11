import { fastify } from 'fastify';
import { RobberEngine } from './core';
import { Logger } from './logger';
import { BuiltPlugin } from './plugin/builtplugin';

/**
 * 小说爬虫的Api服务器模块
 */
export class NovelServer {
	static object = new NovelServer();

	FASTIFY = fastify({
		logger: Logger,
		// http2: true,
		ignoreTrailingSlash: true
	});

	constructor() {
		Logger.info(`开始监听服务器`)
		this.FASTIFY.listen(3000, '0.0.0.0');

		/**
		 * 加载内置的插件源
		 */

		RobberEngine.object.LoadPlugin(new BuiltPlugin()).then(() => {
			Logger.info('插件加载完毕');
		});

		/**
		 * 加载生成的json schema
		 */

		this.FASTIFY.addSchema(require("./Interfaces/schema.json"));
		Logger.info(JSON.stringify(this.FASTIFY.getSchema('schema#/definitions/IChapter')));

		/**
		 * 注册一些基本路由
		 */
		this.FASTIFY.route({
			method: "GET",
			url: "/version",
			handler: async (req, rep) => {
				return {
					version: "1.0"
				}
			}
		})
		// @TODO
	}
}
