import { combineReducers } from "redux";
import { entityReducer, EntitiesState } from "./entity.reducer";

export type TRootState = {
    entities: EntitiesState;
};

const reducers = combineReducers({
    entities: entityReducer
});

export default reducers;
