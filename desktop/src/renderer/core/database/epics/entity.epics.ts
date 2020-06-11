import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { exhaustMap, filter, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import {entityActions, requestActions, TActions} from "../actions";
import { TRootState } from "../reducers";
import { insertEntity } from '../services';

const insertEntityEpic: Epic<TActions, TActions, TRootState> = (actions$, store) => {
    return actions$.pipe(
        filter(action => {
            const b = [[]]
            return isActionOf(entityActions.insert)(action)
        }),
        exhaustMap(action => from(insertEntity()).pipe(
            map(requestActions.resolved)
        ))
    );
}

export default [
    insertEntityEpic
]
