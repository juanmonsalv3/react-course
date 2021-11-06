import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';

const composedEnhancer = composeWithDevTools(
	// Add whatever middleware you actually want to use here
	applyMiddleware(thunkMiddleware)
	// other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);
export default store;
