import { deprecated, ActionType } from 'typesafe-actions';
import { REQUEST_RESOLVED, REQUEST_SENT } from "../constants";
import { Crud } from '../enums';

export enum RequestType {
    ENTITY
}

export type RequestPayload = {
    type: RequestType;
    body: any;
    crud: Crud;
}

const { createAction } = deprecated;

const resolved = createAction(
    REQUEST_RESOLVED, resolve => (payload: any) => resolve(payload)
);

const sent = createAction(
    REQUEST_SENT, resolve => (type: RequestType, body: any, crud: Crud) => resolve({ type, body, crud })
)
export type RequestSentParameters = Parameters<typeof sent>;

export const requestActions = {
    resolved,
    sent
}


export type TRequestActions = ActionType<typeof requestActions>;
