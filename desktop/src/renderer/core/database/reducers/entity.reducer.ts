import { ActionType, getType } from 'typesafe-actions';

import { entityActions, TEntityActions } from "../actions";
import { Entity } from "../models";
import { produce } from "immer";

type TWriteable<T> = { -readonly [P in keyof T]: T[P] };

export interface IEntityState {
    readonly loading: boolean;
    readonly entity?: Entity
}

const initialEntityState: IEntityState = {
    loading: false,
};

export const entityReducer = produce(
    (draft: TWriteable<IEntityState> = initialEntityState, action: TEntityActions) => {
        switch (action.type) {
            case getType(entityActions.insert):
                draft.entity = action.payload;
                draft.loading = true;
        }
    }
);
