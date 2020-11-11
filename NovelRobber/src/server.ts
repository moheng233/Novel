import { fastify } from 'fastify';
import { Logger } from './logger';

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

        // @TODO
	}
}
