import * as path from 'path'
import * as fs from 'fs'
import { Parser as parse } from '../../services';
import { isLeft, Either, left, right, either } from 'fp-ts/lib/Either'
import { IConfig } from '../../interfaces';
import { singleton } from 'tsyringe';
import { TConfig, TProject, RConfig } from './definitions';
import *  as t from 'io-ts';
const fsp = fs.promises;

const CONFIG_ERROR = {
    CONFIG_FILE_DOES_NOT_EXIST: (file: string) => `Config file does not exist: ${file}\nAre you inside a poly project working directory?\nTry "poly init" or "poly pull github-repo-url"`
}

const CONFIG_MESSAGE = {
    USING_CONFIG: (file: string) => `Using poly-config located at ${file}`
}

const POLY_CONFIG_FILE_NAME = 'poly-config.json';

@singleton()
export class Config implements IConfig {

    public projects: Either<null, TProject[]> = left(null);

    public useConfig = (): Promise<string> => new Promise(async (resolve, reject) => {
        const configFile = path.resolve(process.cwd(), POLY_CONFIG_FILE_NAME)

        const configExists = await fsp.stat(configFile).catch(e => false);

        if (!configExists) {
            return reject(CONFIG_ERROR.CONFIG_FILE_DOES_NOT_EXIST(configFile));
        }

        const config =
            await parse.JSON<TConfig>(
                await fsp.readFile(configFile, 'utf8'), configFile, RConfig.decode
            )

        if (isLeft(config)) {
            return reject(config.left);
        }

        this.projects = right(config.right.projects);

        resolve(CONFIG_MESSAGE.USING_CONFIG(configFile));

    })

}