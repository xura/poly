import { Epic } from "redux-observable";
import { from } from "rxjs";
import { exhaustMap, filter, map, tap } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { entityActions, requestActions, TActions, RequestType } from "../actions";
import { TRootState } from "../reducers";
import { insertEntity } from '../services';
import { AsyncQueue, queue } from "async";

const initialRequestQueue: () => AsyncQueue<any> = () => {
    const q = queue((task: any, callback) => {
        task(callback)
    }, 1);

    // @ts-ignore
    q.drain = () => {
        debugger;
    }
    return q;
};

const requestQueue: AsyncQueue<any> = initialRequestQueue();


const requestSentEpic: Epic<TActions, TActions, TRootState> = (actions$, store) => {
    return actions$.pipe(
        filter(isActionOf(requestActions.sent)),
        map(action => requestTypeActionMapping(action.payload)),
        tap(action => requestQueue.push((callback: any) => {
            //debugger;
            insertEntity("request ONE").then(() => {
                //debugger;
                callback(123)
            })
        })),
        tap(action => requestQueue.push((callback: any) => {
            //debugger;
            insertEntity("request TWO").then(() => {
                //debugger;
                callback(123)
            })
        }))
    );
}

const requestTypeActionMapping =
    // TODO change Record<any> to all request types
    (request: { type: RequestType, body: any }): Record<any, TActions> => {
        //debugger;
        return {
            [RequestType.Entity]: entityActions.insert(request.body)
        }[request.type]
    }

export default [
    requestSentEpic
]
