import { createSelector } from 'reselect';
import { TRootState } from '../reducers';

const entities = (state: TRootState) => state.entities.all

export const entitySelectors = {
    entities
}