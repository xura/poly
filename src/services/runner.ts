import { IConfig } from '../interfaces';
import { inject, autoInjectable } from 'tsyringe';

@autoInjectable()
export class Runner {
    constructor(@inject('IConfig') private _config?: IConfig) {
        this._config?.useConfig();
    }
}