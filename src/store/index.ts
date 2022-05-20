import { combineReducers, createStore } from 'redux';
// reducers

const Reducers = combineReducers({});
const store = createStore(Reducers);
export type RootState = ReturnType<typeof Reducers>;
export default store;
