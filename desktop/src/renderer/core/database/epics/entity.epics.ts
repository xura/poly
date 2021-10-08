import { Epic } from "redux-observable";
import { from, of } from "rxjs";
import { exhaustMap, filter, map, catchError } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import {entityActions, requestActions, TActions} from "../actions";
import { TRootState } from "../reducers";
import { insertEntity } from '../services';
import {Entity} from "../models";

const insertEntityEpic: Epic<TActions, TActions, TRootState> = (actions$, store) => {
    return actions$.pipe(
        filter(action => {
            debugger;
            return isActionOf(entityActions.insert)(action)
        }),
        exhaustMap(action => from(insertEntity(action.payload)).pipe(
            map((a: Entity, b: number) => {
                debugger;
                return requestActions.resolved(a)
            })
        ))
    );
}

export default [
    insertEntityEpic
]
