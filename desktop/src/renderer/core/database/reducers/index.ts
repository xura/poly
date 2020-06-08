import { combineReducers } from "redux";
import { entityReducer, IEntityState } from "./entity.reducer";

export type TRootState = {
    entity: IEntityState;
};

const reducers = combineReducers({
    entity: entityReducer
});

export default reducers;
