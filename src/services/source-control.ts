import { IConfig, ISourceControl } from '../interfaces';
import { inject, autoInjectable } from 'tsyringe';
import { Logger as log } from '../services/logger';
import { exists } from '../shared/assertions';
import { Either } from 'fp-ts/lib/Either';

@autoInjectable()
export class SourceControl implements ISourceControl {

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
        @inject('ISourceControl') private _sourceControl?: ISourceControl
    ) { }

    pushAll(): Promise<Either<string, null>> {
        exists(this._sourceControl);
        return this._useConfig(this._sourceControl.pushAll);
    }
}