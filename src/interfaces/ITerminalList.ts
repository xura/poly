import { Either } from 'fp-ts/lib/Either';

export enum ITEM_STATE {
    SUCCESS = 'success',
    PENDING = 'pending'
}

export type ProjectStatusDefintion = [string, Either<string, ITEM_STATE>];

export interface ITerminalList {
    drawList(definitions: ProjectStatusDefintion[]): void;
}