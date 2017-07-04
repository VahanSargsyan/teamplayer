import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import training from './training.reducer';

const reducers = combineReducers({
	training
});

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;
