import { deprecated, ActionType } from 'typesafe-actions';
import { REQUEST_RESOLVED, REQUEST_SENT } from "../constants";

export enum RequestType {
    Entity
}

const { createAction } = deprecated;

const resolved = createAction(
    REQUEST_RESOLVED, resolve => (payload: any) => resolve(payload)
);

const sent = createAction(
    REQUEST_SENT, resolve => (type: RequestType, body: any) => resolve({ type, body })
)

export const requestActions = {
    resolved,
    sent
}

// @ts-ignore
window.requestActions = requestActions;

export type TRequestActions = ActionType<typeof requestActions>;
