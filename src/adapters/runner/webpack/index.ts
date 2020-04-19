import { IRunner, IConfig } from '../../../interfaces';
import shell from 'shelljs';
import { injectable, inject } from 'tsyringe';
import { isRight } from 'fp-ts/lib/Either';
import { exists } from '../../../shared/assertions';
import { cwd, dir } from '../../../shared/fs';

@injectable()
export class Webpack implements IRunner {

    constructor(
        @inject('IConfig') private _config?: IConfig
    ) { }

    runAll = (): void => {
        exists(this._config)

        if (isRight(this._config.projects)) {
            const project1 = this._config.projects.right[0];
            const entry = `${cwd(project1.directory)}/${project1.entry}`;
            const webpackCommand = dir(__dirname, "commands/webpack.ts")
            shell.exec(`ts-node ${webpackCommand} ${entry}`)
        }
    }

    runSingle(): void {

    }

}