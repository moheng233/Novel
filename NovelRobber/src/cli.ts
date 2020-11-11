#! /usr/bin/env node

import figlet from 'figlet';
import inquirer from 'inquirer'
import Logger from './logger';
import { ICompleteNovel, INovel } from './plugin';
import { resolve } from 'path';
import epub from 'epub-gen';

import async from 'async';

import { BiQuGePlugin } from './plugin/BiQuGe'

(async () => {
	console.log(figlet.textSync("NovelRobber","Ghost"));

	let { search } = await inquirer.prompt<{
		search:string
	}>([
		{
			type: "input",
			name: "search",
			message: "要搜索的书名"
		}
	])

	let nr = new BiQuGePlugin();

	if(search != ""){
		let page: number = 1;
		let novel: INovel;

		while(true){
			let nlist = await nr.GetList(search,page);

			let data = await inquirer.prompt({
				type: "list",
				message: "搜索到的书",
				name: "select",
				choices: (r) => {
					let novels = nlist.novels;

					let list: string[] = [];

					for (let d of novels){
						list.push(d.title);
					}

					if(nlist.maxpage > nlist.current){
						list.push("下一页");
					}

					return list;
				}
			})

			if(data.select != "下一页"){
				novel = nlist.novels.find((e) => {
					return e.title === data.select
				})

				break;
			}

			page += 1;
		}

		let cnovel = await nr.GetNovel(novel);

		Logger.info(`你选择了《${cnovel.title}》`);
		Logger.info(`简绍：${cnovel.introduce}`);
		Logger.info(`共${cnovel.chapter.length}章`);


		let data = await inquirer.prompt({
			type: "list",
			message: "选择",
			name: "select",
			choices: [
				'导出epub格式',
				'直接看！'
			]
		});

		if(data.select == "导出epub格式"){
			Logger.info(`文件将导出到${resolve(__dirname,`${cnovel.title}.epub`)}`)

			let contentlist: {
				title: string,
				data: string
			}[] = [];

			await async.mapLimit(cnovel.chapter,10, async (task,callback) => {
				contentlist.push({
					title: task.title,
					data: await nr.GetContent(task)
				})

				callback()
			})

			Logger.info("爬取完成");

			new epub({
				title: cnovel.title,
				author: cnovel.author,
				content: contentlist
			},resolve(__dirname,`${cnovel.title}.epub`))
		}
	} else {
		Logger.error("你这搜索个寂寞?");
	}
})()
