import * as path from 'path'
import * as fs from 'fs'
import { Parser as parse } from '../services';
import chalk = require('chalk');
import * as t from 'io-ts';
const fsp = fs.promises;

const ConfigDefinition = t.type({
    config: t.string
})

type TConfig = t.TypeOf<typeof ConfigDefinition>;

const CONFIG_ERROR = {
    CONFIG_FILE_DOES_NOT_EXISTS: (file: string) => `Config file does not exist: ${file}\nAre you inside a poly project working directory?\nTry "poly init" or "poly pull github-repo-url"`
}

const POLY_CONFIG_FILE_NAME = 'poly-config.json';

export class Config {

    public setConfig = (): Promise<string> => new Promise(async (resolve, reject) => {
        const configFile = path.resolve(process.cwd(), POLY_CONFIG_FILE_NAME)

        const configExists = await fsp.stat(configFile).catch(e => false);

        if (!configExists) {
            return reject(CONFIG_ERROR.CONFIG_FILE_DOES_NOT_EXISTS(configFile));
        }

        const [config, errorParsingConfig] =
            await parse.JSON<string>(
                await fsp.readFile(configFile, 'utf8'), configFile
            ).catch(e => e)

        if (!!errorParsingConfig) {
            return reject(errorParsingConfig);
        }

        // TODO should we use validate instead of decode here?
        const validConfig = ConfigDefinition.decode(config);

        console.log(chalk.green(config))

        debugger;

    })

}