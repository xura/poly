import { Either } from 'fp-ts/lib/Either';

export interface IConfig {
    useConfig(): Promise<string>;
    projects: Either<null, string[]>;
}