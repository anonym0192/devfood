import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import CartReducer from './CartReducer';
import SearchReducer from './SearchReducer';
import ShippingReducer from './ShippingReducer';
import StatusMessageReducer from './StatusMessageReducer';

export default combineReducers({
    search: SearchReducer,
    user: UserReducer,
    cart: CartReducer,
    shipping: ShippingReducer,
    statusMessage: StatusMessageReducer
});