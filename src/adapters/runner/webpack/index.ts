import { IRunner, IConfig, IProcess, ITerminalList, ProjectStatusDefintion, ITEM_STATE } from '../../../interfaces';
import { injectable, inject } from 'tsyringe';
import { right, Either, left } from 'fp-ts/lib/Either';
import { Option, some, none, isNone, option } from 'fp-ts/lib/Option';
import { exists } from '../../../shared/assertions';
import { cwd, dir } from '../../../shared/fs';
import { sequenceT } from 'fp-ts/lib/Apply'

const WEBPACK_RUNNER_ERRORS = {
    ERROR_COLLECTING_PROJECT_DATA: "There was an error collecting the project data"
}

@injectable()
export class Webpack implements IRunner {

    constructor(
        @inject('IConfig') private _config?: IConfig,
        @inject('IProcess') private _process?: IProcess,
        @inject('ITerminalList') private _terminalList?: ITerminalList
    ) { }

    _getProjectStateDefinitions = (): Option<ProjectStatusDefintion[]> => {
        exists(this._config)

        if (isNone(this._config.projects))
            return none;

        return some(this._config.projects.value.map(project => ([
            project.name,
            right(ITEM_STATE.PENDING)
        ])));
    }

    runAll = (): Promise<Either<string, null>> => {
        exists(this._config)
        exists(this._process)
        exists(this._terminalList)

        const dependents = sequenceT(option)(
            this._config.projects,
            this._getProjectStateDefinitions(),
        );

        if (isNone(dependents))
            return Promise.reject(left(WEBPACK_RUNNER_ERRORS.ERROR_COLLECTING_PROJECT_DATA));

        const [projects, projectStateDefinitions] = dependents.value;

        this._terminalList.drawList(projectStateDefinitions);

        this._process.start(projects.map(project => {
            const entry = `${cwd(project.directory)}/${project.entry}`;
            const webpackCommand = dir(__dirname, "commands/webpack.ts")
            return [
                project.name, `ts-node ${webpackCommand} ${entry}`
            ]
        })).subscribe(data => {
            exists(this._terminalList)

            this._terminalList.drawList(projectStateDefinitions.map(project => {
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