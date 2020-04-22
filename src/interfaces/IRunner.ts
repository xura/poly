import { Either } from 'fp-ts/lib/Either';

export interface IRunner {
    runAll(): Promise<Either<string, null>>;
    runSingle(): Promise<Either<string, null>>;
}