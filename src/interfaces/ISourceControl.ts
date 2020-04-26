import { Either } from 'fp-ts/lib/Either';

export interface ISourceControl {
    pushAll(): Promise<Either<string, null>>
}