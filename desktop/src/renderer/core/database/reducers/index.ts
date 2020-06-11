import { combineReducers } from "redux";
import { entityReducer, EntityState } from "./entity.reducer";

export type TRootState = {
    entity: EntityState;
};

const reducers = combineReducers({
    entity: entityReducer
});

export default reducers;
