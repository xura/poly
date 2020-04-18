import { Either } from 'fp-ts/lib/Either';
import { TProject } from '../core/config/definitions';

export interface IConfig {
    useConfig(): Promise<string>;
    projects: Either<null, TProject[]>;
}