import { deprecated, ActionType } from 'typesafe-actions';
import {REQUEST_RESOLVED, REQUEST_SENT} from "../constants";

const { createAction } = deprecated;

const resolved = createAction(
    REQUEST_RESOLVED, resolve => (payload: any) => resolve(payload)
);

const sent = createAction(
    REQUEST_SENT, resolve => (type: string, body: any) => resolve({type, body})
)

export const requestActions = {
    resolved,
    sent
}

export type TRequestActions = ActionType<typeof requestActions>;
