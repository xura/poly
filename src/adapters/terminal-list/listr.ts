import { ITerminalList, ITEM_STATE } from '../../interfaces/ITerminalList';
import { Either, isRight, isLeft } from 'fp-ts/lib/Either';
import { default as listr } from 'listr';

export class Listr implements ITerminalList {

    drawList(definitions: [string, Either<string, ITEM_STATE>][]): void {
        console.clear()
        new listr(definitions.map(definition => ({
            title: definition[0],
            task: () => {
                if (isLeft(definition[1])) {
                    return Promise.reject(new Error(definition[1].left))
                } else {
                    switch (definition[1].right) {
                        case ITEM_STATE.SUCCESS:
                            return Promise.resolve();
                        case ITEM_STATE.PENDING:
                            return Promise.resolve();
                    }
                }
            }
        })), {
            concurrent: true,
            exitOnError: false
        }).run().catch(e => e)
    }
}