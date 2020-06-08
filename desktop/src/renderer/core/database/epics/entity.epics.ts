import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { exhaustMap, filter, map, catchError } from "rxjs/operators";
import { isActionOf, Action } from "typesafe-actions";

import { entityActions } from "../actions";
import { TRootState } from "../reducers";
import { insertEntity } from '../services';

// const insertEntityEpic: Epic<Action, Action, TRootState> = (actions$, store) =>
//     actions$.pipe(
//         filter(isActionOf(entityActions.insert)),
//         exhaustMap(action => from(insertEntity()).pipe(
//             map(entityActions.insert)
//         ))
//     )
