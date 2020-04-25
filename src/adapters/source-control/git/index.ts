import { injectable, inject } from 'tsyringe';
import { right, Either, left } from 'fp-ts/lib/Either';
import { isNone, option } from 'fp-ts/lib/Option';
import { sequenceT } from 'fp-ts/lib/Apply'

import { exists, cwd, dir } from '../../../shared';
import { IConfig, IProcess, ITerminalList, ITEM_STATE, ISourceControl } from '../../../interfaces';
import { getProjectStateDefinitions } from '../../terminal-list/helpers/project-state-definitions';


const GIT_ERRORS = {
    ERROR_COLLECTING_PROJECT_DATA: "There was an error collecting the project data"
}

@injectable()
export class Git implements ISourceControl {

    constructor(
        @inject('IConfig') private _config?: IConfig,
        @inject('IProcess') private _process?: IProcess,
        @inject('ITerminalList') private _terminalList?: ITerminalList
    ) { }

    pushAll = (): Promise<Either<string, null>> => {
        exists(this._config)
        exists(this._process)
        exists(this._terminalList)

        const dependents = sequenceT(option)(
            this._config.projects,
            getProjectStateDefinitions(this._config.projects)
        );

        if (isNone(dependents))
            return Promise.reject(left(GIT_ERRORS.ERROR_COLLECTING_PROJECT_DATA));

        const [projects, projectStateDefinitions] = dependents.value;
        const drawList = this._terminalList.drawList("Pushing all files from the following repos")

        drawList(projectStateDefinitions);

        this._process.start(projects.map(project => {
            const gitPushCommand = dir(__dirname, "commands/git-push.ts")
            return [
                project.name, `ts-node ${gitPushCommand} ${cwd(project.directory)}`
            ]
        })).subscribe(data => {
            exists(this._terminalList)

            drawList(projectStateDefinitions.map(project => {
                if (project[0] === data[0]) {
                    if (data[1] === "null") {
                        project[1] = right(ITEM_STATE.SUCCESS)
                    } else {
                        project[1] = left(data[1])
                    }
                }
                return project;
            }));
        })

        return Promise.resolve(right(null));
    }

    runSingle(): Promise<Either<string, null>> {
        throw Error("Method not implemented")
    }

}