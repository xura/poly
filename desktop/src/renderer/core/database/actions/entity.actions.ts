import { deprecated, ActionType } from 'typesafe-actions';
import { Entity } from "../models";
import { ENTITY_INSERT } from "../constants";

const { createAction } = deprecated;

const insert = createAction(
    ENTITY_INSERT, resolve => (entity: Entity) => {
        //debugger;
        return resolve(entity)
    }
);


export const entityActions = {
    insert
}

// @ts-ignore
window.actions = entityActions;


export type TEntityActions = ActionType<typeof entityActions>;
