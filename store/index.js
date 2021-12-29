
import { applyMiddleware, compose, createStore,combineReducers } from 'redux';
import home from './reducers/home';
import order from './reducers/order'
import menu_orders from './reducers/menu_orders';
import thunk from 'redux-thunk';
import common_orders_list from './reducers/common-orders';
import wallet from './reducers/wallet';
import auth from './reducers/auth';

const  rootReducer=combineReducers({
  home,
  order,
  menu_orders,
  common_orders_list,
  wallet,
  auth,
});


const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
 const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store