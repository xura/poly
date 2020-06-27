import { getType } from 'typesafe-actions';

import { produce } from "immer";
import { entityActions, TEntityActions } from "../actions";
import { Entity } from "../models";
import TWriteable from "../shared/TWritable";

export interface EntitiesState {
    readonly all?: Entity[]
}

export const entityReducer = produce(
    (draft: TWriteable<EntitiesState> = {}, action: TEntityActions) => {
        switch (action.type) {
            case getType(entityActions.insert):
                draft.all?.push(action.payload);
                break;
            default:
                return draft;
        }
    }
);
