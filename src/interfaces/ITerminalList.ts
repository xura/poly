import { Either } from 'fp-ts/lib/Either';

export enum ITEM_STATE {
    SUCCESS = 'success',
    PENDING = 'pending'
}

// [project name, error message or ITEM_STATE, message]
export type ProjectStatusDefintion = [string, Either<string, ITEM_STATE>, string];

export interface ITerminalList {
    drawList: (title: string) => (definitions: ProjectStatusDefintion[]) => void;
}