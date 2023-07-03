import cartReducer from "./cartReducer";
import valueReducer from "./valueReducer";
import ThunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';


const rootReducer = combineReducers({
    cart: cartReducer,
    value: valueReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(ThunkMiddleware)) 
);

export default store;