import { entityActions } from '../actions';
import { select } from 'redux-most'
import {
    curriedFilter as filter,
    curriedMap as map,
    fetchJsonStream
} from '../shared/utils';
import { compose } from 'ramda';
import { insertEntity } from '../services';
import { isActionOf } from 'typesafe-actions';

const insertEntityEpic = compose(
    map(entityActions.insert),
    compose(fetchJsonStream, insertEntity),
    select(isActionOf(entityActions.insert))
)