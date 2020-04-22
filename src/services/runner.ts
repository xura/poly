import { IConfig, IRunner } from '../interfaces';
import { inject, autoInjectable } from 'tsyringe';
import { Logger as log } from '../services/logger';
import { exists } from '../shared/assertions';
import { Either } from 'fp-ts/lib/Either';

@autoInjectable()
export class Runner implements IRunner {

    private _useConfig = (method: () => Promise<Either<string, null>>) => {
        exists(this._config);

        return this._config.useConfig()
            .then(success => {
                log.success(success);
                return method();
            });
    }

    constructor(
        @inject('IConfig') private _config?: IConfig,
        @inject('IRunner') private _runner?: IRunner
    ) { }

    runAll(): Promise<Either<string, null>> {
        exists(this._runner);
        return this._useConfig(this._runner.runAll);
    }

    runSingle(): Promise<Either<string, null>> {
        exists(this._runner);
        return this._useConfig(this._runner.runSingle);
    }
}