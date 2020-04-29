import { Option, isNone, none, some } from 'fp-ts/lib/Option';
import { TProject } from '../../../core/config/definitions';
import { ProjectStatusDefintion, ITEM_STATE } from '../../../interfaces';
import { right } from 'fp-ts/lib/Either';

export const getProjectStateDefinitions = (projects: Option<TProject[]>, pendingMessage: string): Option<ProjectStatusDefintion[]> => {

    if (isNone(projects))
        return none;

    return some(projects.value.map(project => ([
        project.name,
        right(ITEM_STATE.PENDING),
        pendingMessage
    ])));
}