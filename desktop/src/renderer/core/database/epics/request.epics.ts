import { Epic } from "redux-observable";
import { from } from "rxjs";
import { mergeMap, filter, map, tap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { entityActions, requestActions, TActions, RequestType, TEntityActions, RequestSentParameters } from "../actions";
import { TRootState } from "../reducers";
import { insertEntity } from '../services';
import { AsyncQueue, queue } from "async";
import { Crud } from '../enums/crud.enum';
const initialRequestQueue: () => AsyncQueue<any> = () => {
    const q = queue((task: any, callback) => task(callback), 1);

    q.drain = () => {
        debugger;
        return Promise.resolve();
    }

    return q;
};

const requestQueue: AsyncQueue<any> = initialRequestQueue();

const requestSentEpic: Epic<TActions, TActions, TRootState> = (actions$, store) => actions$.pipe(
    filter(isActionOf(requestActions.sent)),
    map(action => actionToExternalRequestMapping(action.payload)[action.payload.type][action.payload.crud]),
    tap(([_, externalFn]) => requestQueue.push((callback: any) => externalFn().then(callback))),
    map(([actionFn, _]) => actionFn())
);

type ActionToExternalMapping = Record<Crud, [() => TEntityActions, () => Promise<any>]>;
type RequestTypeToExternalMapping = Record<RequestType, ActionToExternalMapping>;
const actionToExternalRequestMapping = (payload: any): RequestTypeToExternalMapping => {
    const { type, body, crud } = payload;
    return {
        [RequestType.ENTITY]: {
            [Crud.CREATE]: [() => entityActions.insert(body), () => insertEntity(body)],
            [Crud.READ]: [() => entityActions.insert(body), () => insertEntity(body)],
            [Crud.UPDATE]: [() => entityActions.insert(body), () => insertEntity(body)],
            [Crud.DELETE]: [() => entityActions.insert(body), () => insertEntity(body)]
        }
    }
}

export default [
    requestSentEpic
]
