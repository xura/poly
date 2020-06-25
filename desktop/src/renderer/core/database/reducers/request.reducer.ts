import { getType } from 'typesafe-actions';

import { produce } from "immer";
import { TRequestActions, requestActions, RequestType } from "../actions";
import { Maybe, Nothing, Just } from 'purify-ts';

export interface RequestState {
    id: string;
    sent: boolean;
    resolved: boolean;
    error: boolean;
    type: RequestType;
    payload: any;
}

export interface RequestQueueState {
    queue: Array<RequestState>; // AsyncQueue<any>;
    mostRecentSentRequest: Maybe<RequestState>;
}

const requestQueueState: RequestQueueState = {
    queue: [],
    mostRecentSentRequest: Nothing
};

// TODO make enums switch statments exhaustive
export const requestReducer = produce(
    (draft: RequestQueueState = requestQueueState, action: TRequestActions) => {
        switch (action.type) {
            case getType(requestActions.sent):
                draft.mostRecentSentRequest = Just({
                    id: Math.random().toString(),
                    sent: true,
                    resolved: false,
                    error: false,
                    type: action.payload.type,
                    payload: action.payload.body
                });
                draft.mostRecentSentRequest.caseOf({
                    Just: requestState => draft.queue.push(requestState), Nothing: () => { }
                });
            case getType(requestActions.resolved):
                draft.queue = produce(draft.queue, queue => {
                    queue[queue.findIndex(ra => ra.id)].resolved = true;
                });
        }
    }
);
