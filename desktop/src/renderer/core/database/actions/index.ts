import {ActionType} from "typesafe-actions/dist/type-helpers";
import {TEntityActions} from "./entity.actions";
import {TRequestActions} from "./request.actions";

export * from './entity.actions';
export * from './request.actions';
export type TActions = ActionType<TEntityActions | TRequestActions>;
