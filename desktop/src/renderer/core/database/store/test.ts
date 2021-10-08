import { store } from './index';
import { entityActions } from '../actions';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
window.entityActions = {
    insert: () => store.dispatch(entityActions.insert({id: 123}))
}
