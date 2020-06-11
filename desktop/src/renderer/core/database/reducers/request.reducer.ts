import { getType } from 'typesafe-actions';

import { produce } from "immer";
import { requestActions, TRequestActions } from "../actions";
import { Entity } from "../models";

type TWriteable<T> = { -readonly [P in keyof T]: T[P] };

export interface RequestState {
    sent: boolean;
    resolved: boolean;
    error: boolean;
    type: string;
    payload: any;
}

export const entityReducer = produce(
    (draft: TWriteable<EntityState> = {}, action: TEntityActions) => {
        switch (action.type) {
            case getType(entityActions.insert):
                draft.entity = action.payload;
        }
    }
);
