import { IRunner, IConfig } from '../../interfaces';
import { Logger as log } from '../../services';
import { injectable, inject } from 'tsyringe';
import { isRight } from 'fp-ts/lib/Either';
import { exists } from '../../shared/assertions';

@injectable()
export class Webpack implements IRunner {

    constructor(
        @inject('IConfig') private _config?: IConfig
    ) { }

    runAll = (): void => {
        exists(this._config)

        if (isRight(this._config.projects)) {
            log.success(JSON.stringify(this._config.projects.right))
        }
    }

    runSingle(): void {

    }

}