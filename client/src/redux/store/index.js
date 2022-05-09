import { createStore, applyMiddleware, compose } from 'redux';
import gamesReducer from '../reducer';
import thunk from 'redux-thunk';

const composeEnhancers =
	(typeof window !== 'undefined' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(
	gamesReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
