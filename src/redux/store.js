import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

export default createStore(rootReducer, composeWithDevTools(
  applyMiddleware(reduxThunk)
));
