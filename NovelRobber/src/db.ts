import Lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { INoveldb } from './core';

import { resolve } from 'path';
import { INovel } from './plugin';

export class NovelDb {
	object = new NovelDb();

	Noveldb = Lowdb(new FileSync<INoveldb>(resolve(__dirname, "../db.json")));

	constructor(){
		this.Noveldb.defaults<{ novel: INovel[] }>({
			novel: []
		}).write();
	}
}
