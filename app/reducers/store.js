import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import test from './test.reducer';
import training from './training.reducer';

const reducers = combineReducers({
	test, training
});

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;
