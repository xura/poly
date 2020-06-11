import { combineEpics} from "redux-observable";

import entityEpics from './entity.epics';

const epics = combineEpics(...entityEpics);

export default epics;
