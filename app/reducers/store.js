import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import training from './training.reducer';
import auth from './auth.reducer'
import flashMessage from './flashMessage.reducer'

const reducers = combineReducers({
	training, auth, flashMessage
});

const store = createStore(
    reducers,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)

);

export default store;
