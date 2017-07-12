import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import training from './training.reducer';
import profile from './profile.reducer';

import auth from './auth.reducer'
import flashMessage from './flashMessage.reducer'
import grid from './gridReducer'

const reducers = combineReducers({
	training, auth, flashMessage, grid, profile
});

function compact(...fns) {
	return fns.filter((fn) => !!fn);
}

const store = createStore(
    reducers,
	compose(...compact(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : void(0)
	))

);

export default store;
