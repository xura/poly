import { ActionType } from "typesafe-actions/dist/type-helpers";
import { TEntityActions } from "./entity.actions";
import { TRequestActions } from "./request.actions";

export * from './entity.actions';
export * from './request.actions';

// TODO this casts to any, can we get a type that encompasses all actions?
export type TActions = ActionType<TEntityActions | TRequestActions>;
