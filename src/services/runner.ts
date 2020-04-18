import { IConfig, IRunner } from '../interfaces';
import { inject, autoInjectable } from 'tsyringe';
import { Logger as log } from '../services/logger';
import { exists } from '../shared/helpers';



@autoInjectable()
export class Runner implements IRunner {

    private _useConfig = (method: () => void) => {
        this._config?.useConfig()
            .then(success => {
                log.success(success);
                method();
            })
            .catch(e => log.error(e));
    }

    constructor(
        @inject('IConfig') private _config?: IConfig,
        @inject('IRunner') private _runner?: IRunner
    ) { }

    runAll(): void {
        exists(this._runner);
        this._useConfig(this._runner?.runAll);
    }

    runSingle(): void {
        exists(this._runner);
        this._useConfig(this._runner?.runSingle);
    }
}