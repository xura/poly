import { combineEpics } from "redux-observable";
import requestEpics from "./request.epics";

const epics = combineEpics(...requestEpics);

export default epics;
