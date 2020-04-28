import path from 'path'
import { promises as fs } from 'fs'
import { Option, none, some } from 'fp-ts/lib/Option'
import { isLeft } from 'fp-ts/lib/Either';
import { singleton } from 'tsyringe';

import { Parser as parse } from '../../services';
import { IConfig } from '../../interfaces';
import { TConfig, TProject, RConfig, TDevServer } from './definitions';

const CONFIG_ERROR = {
    CONFIG_FILE_DOES_NOT_EXIST: (file: string) => `Config file does not exist: ${file}\nAre you inside a poly project working directory?\nTry "poly init" or "poly pull github-repo-url"`,
    WEBPACK_RUNNER_AND_DEV_SERVER: 'If a project is specified with "runner: webpack", there must be a top level "devServer" also specified.'
}

const CONFIG_MESSAGE = {
    USING_CONFIG: (file: string) => `Using poly-config located at ${file}`
}

const POLY_CONFIG_FILE_NAME = 'poly-config.json';

@singleton()
export class Config implements IConfig {

    public projects: Option<TProject[]> = none;
    public devServer: Option<TDevServer> = none;

    public useConfig = (): Promise<string> => new Promise(async (resolve, reject) => {
        const configFile = path.resolve(process.cwd(), POLY_CONFIG_FILE_NAME)

        const configExists = await fs.stat(configFile).catch(e => false);

        if (!configExists) {
            return reject(CONFIG_ERROR.CONFIG_FILE_DOES_NOT_EXIST(configFile));
        }

        const config =
            await parse.JSON<TConfig>(
                await fs.readFile(configFile, 'utf8'), configFile, RConfig.decode
            )

        if (isLeft(config)) {
            return reject(config.left);
        }

        this.projects = some(config.right.projects);

        const usingWebpackRunner =
            config.right.projects.find(p => p.runner === 'webpack');

        if (usingWebpackRunner && !config.right.devServer) {
            return reject(CONFIG_ERROR.WEBPACK_RUNNER_AND_DEV_SERVER);
        }

        this.devServer = some(config.right.devServer as TDevServer);

        resolve(CONFIG_MESSAGE.USING_CONFIG(configFile));

    })

}