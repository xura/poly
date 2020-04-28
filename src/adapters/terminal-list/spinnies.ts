import { ITerminalList, ProjectStatusDefintion, ITEM_STATE } from '../../interfaces';
import spinnies from 'spinnies';
import { isLeft } from 'fp-ts/lib/Either';
import { singleton } from 'tsyringe';
import { Logger as log } from '../../services';

export enum STATUS {
    SUCCEED = 'succeed',
    FAIL = 'fail',
    SPINNING = 'spinning'
}

singleton()
export class Spinnies implements ITerminalList {

    private _spinner = { interval: 150, frames: ['🍇', '🍈', '🍉', '🍋'] }
    private _spinnies = new spinnies({
        color: 'white',
        succeedColor: 'green',
        spinner: this._spinner
    });

    private _getState = (definition: ProjectStatusDefintion): [STATUS, string] => {
        if (isLeft(definition[1])) {
            return [STATUS.FAIL, `${definition[0]}\n${definition[1].left}`];
        } else {
            switch (definition[1].right) {
                case ITEM_STATE.PENDING:
                    return [STATUS.SPINNING, definition[0]]
                    break
                case ITEM_STATE.SUCCESS:
                    return [STATUS.SUCCEED, definition[0]]
                    break;
            }
        }
    }

    drawList = (title: string) => (definitions: ProjectStatusDefintion[]): void => {
        this._spinnies.stopAll(STATUS.FAIL);
        console.clear();
        log.success(title);
        definitions.forEach(definition => {
            const status = this._getState(definition);
            try {
                this._spinnies.update(definition[0], {
                    text: `${status[1]} -- ${definition[2]}`,
                    status: status[0]
                })
            } catch (e) {
                this._spinnies.add(definition[0], {
                    text: `${status[1]} -- ${definition[2]}`,
                    status: status[0]
                })
            }
        })
    }
}