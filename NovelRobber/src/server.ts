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
		http2: true,
		ignoreTrailingSlash: true
	});

    constructor(){
		this.FASTIFY.listen(3000,'0.0.0.0');

		/**
		 * 加载内置的插件源
		 */

		RobberEngine.object.LoadPlugin(new BuiltPlugin()).then(() => {
			Logger.info('内置插件加载完毕');
		});

        // @TODO
	}
}
