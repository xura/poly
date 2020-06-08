import { deprecated, ActionType } from 'typesafe-actions';
const { createAction } = deprecated;
import { Entity } from "../models";

export const ENTITY_INSERT = "@@entity/INSERT";
export const ENTITY_UPDATE = "@@entity/UPDATE";
export const ENTITY_DELETE = "@@entity/DELETE";
export const ENTITY_GET_BY_ID = "@@entity/GET_BY_ID";
export const ENTITY_GET_ALL = "@@entity/GET_ALL";

const insert = createAction(
    ENTITY_INSERT, resolve => (entity: Entity) => resolve(entity)
);

export const entityActions = {
    insert
}

export type TEntityActions = ActionType<typeof entityActions>;