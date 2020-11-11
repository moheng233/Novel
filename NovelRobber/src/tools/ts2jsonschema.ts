import { resolve } from "path";
import { writeFileSync } from 'fs';
import * as tsj from 'ts-json-schema-generator';
import Logger from '../logger';

const config: tsj.Config = {
	path: resolve(__dirname,"../Interfaces/*.interfaces.ts"),
	tsconfig: resolve(__dirname,"../../tsconfig.json"),
	type: "*"
}

let schema = tsj.createGenerator(config).createSchema(config.type);
schema.$id = "schema";

Logger.info(schema);
const FileString = JSON.stringify(schema,null,4);

writeFileSync(resolve(__dirname,"../Interfaces/schema.json"),FileString);
