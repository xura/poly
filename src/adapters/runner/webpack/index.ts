import { IRunner, IConfig, IProcess } from '../../../interfaces';
import { injectable, inject } from 'tsyringe';
import { isRight } from 'fp-ts/lib/Either';
import { Logger as log } from '../../../services/logger';
import { exists } from '../../../shared/assertions';
import { cwd, dir } from '../../../shared/fs';

@injectable()
export class Webpack implements IRunner {

    constructor(
        @inject('IConfig') private _config?: IConfig,
        @inject('IProcess') private _process?: IProcess
    ) { }

    runAll = (): void => {
        exists(this._config)
        exists(this._process)

        if (isRight(this._config.projects))
            this._process.start(this._config.projects.right.map(project => {
                const entry = `${cwd(project.directory)}/${project.entry}`;
                const webpackCommand = dir(__dirname, "commands/webpack.ts")
                return [
                    project.name, `ts-node ${webpackCommand} ${entry}`
                ]
            })).subscribe(data => log.warn(data.toString()))
    }

    runSingle(): void {

    }

}