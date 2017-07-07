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

const store = createStore(
    reducers,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)

);

export default store;
