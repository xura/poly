import { Option } from 'fp-ts/lib/Option';
import { TProject } from '../core/config/definitions';

export interface IConfig {
    useConfig(): Promise<string>;
    projects: Option<TProject[]>;
}