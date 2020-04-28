import { injectable, inject } from 'tsyringe';
import { right, Either, left } from 'fp-ts/lib/Either';
import { sequenceT } from 'fp-ts/lib/Apply'
import { isNone, option } from 'fp-ts/lib/Option';

import { exists } from '../../../shared/assertions';
import { cwd, dir } from '../../../shared/fs';
import { IRunner, IConfig, IProcess, ITerminalList, ITEM_STATE } from '../../../interfaces';
import { getProjectStateDefinitions } from '../../terminal-list/helpers';

const WEBPACK_RUNNER_ERRORS = {
    ERROR_COLLECTING_PROJECT_DATA: "There was an error collecting the project data"
}

const WEBPACK_MESSAGES = {
    LIST_TITLE: "Running all projects",
    PENDING: "Compiling...",
    SUCCESS: (port?: number) => `Running on port ${port}`,
    FAILED: "Failed compilation"
}

const WEBPACK_CONDITIONS = {
    IS_SUCCESSFULL: (output: string) => [
        output === 'null',
        output.search('Compiled') > 0,
        output.search('running') > 0
    ].some(condition => condition === true)
}

@injectable()
export class Webpack implements IRunner {

    constructor(
        @inject('IConfig') private _config?: IConfig,
        @inject('IProcess') private _process?: IProcess,
        @inject('ITerminalList') private _terminalList?: ITerminalList
    ) { }

    runAll = (): Promise<Either<string, null>> => {
        exists(this._config)
        exists(this._process)
        exists(this._terminalList)

        const dependents = sequenceT(option)(
            this._config.projects,
            getProjectStateDefinitions(this._config.projects, WEBPACK_MESSAGES.PENDING),
        );

        if (isNone(dependents))
            return Promise.reject(left(WEBPACK_RUNNER_ERRORS.ERROR_COLLECTING_PROJECT_DATA));

        const [projects, projectStateDefinitions] = dependents.value;
        const drawList = this._terminalList.drawList(WEBPACK_MESSAGES.LIST_TITLE)

        drawList(projectStateDefinitions);

        this._process.start(projects.map(project => {
            const command = (function () {
                if (!!project.command) {
                    return `${cwd(project.command)} ${project.port}`
                } else {
                    const entry = `${cwd(project.directory)}/${project.entry}`;
                    return `${dir(__dirname, "commands/webpack")} ${entry}`
                }
            })();
            return [project.name, `ts-node ${command}`];
        }), "ERROR").subscribe(data =>
            drawList(projectStateDefinitions.map(project => {
                if (data[1] && project[0] === data[0]) {
                    const port = projects.find(p => p.name === project[0])?.port;
                    if (WEBPACK_CONDITIONS.IS_SUCCESSFULL(data[1])) {
                        project[1] = right(ITEM_STATE.SUCCESS)
                        project[2] = WEBPACK_MESSAGES.SUCCESS(port)
                    } else if (data[1].search("Compiling") > 0) {
                        project[1] = right(ITEM_STATE.PENDING)
                        project[2] = WEBPACK_MESSAGES.PENDING
                    } else {
                        project[1] = left(data[1])
                        project[2] = WEBPACK_MESSAGES.FAILED
                    }
                }
                return project;
            })));

        return Promise.resolve(right(null));
    }

    runSingle(): Promise<Either<string, null>> {
        throw Error("Method not implemented")
    }

}