import { getType } from 'typesafe-actions';

import { produce } from "immer";
import { entityActions, TEntityActions } from "../actions";
import { Entity } from "../models";
import TWriteable from "../shared/TWritable";

export interface EntityState {
    readonly entity?: Entity
}

export const entityReducer = produce(
    (draft: TWriteable<EntityState> = {}, action: TEntityActions) => {
        switch (action.type) {
            case getType(entityActions.insert):
                draft.entity = action.payload;
                break;
            default:
                return draft;
        }
    }
);
