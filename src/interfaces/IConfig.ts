import { Option } from 'fp-ts/lib/Option';
import { TProject, TDevServer } from '../core/config/definitions';

export interface IConfig {
    useConfig(): Promise<string>;
    projects: Option<TProject[]>;
    devServer: Option<TDevServer>;
}