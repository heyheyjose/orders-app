import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authenticationState from './authentication';
import ordersState from './orders';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  authenticationState,
  ordersState
});

export default createRootReducer;
