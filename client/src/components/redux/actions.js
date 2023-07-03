
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_CART = "INCREASE_CART"; 
export const DECREASE_CART = "DECREASE_CART";
export const SET_VALUE = "SET_VALUE";
export const TOGGLE_CART_VISIBILITY = "TOGGLE_CART_VISIBILITY";

export const addToCart = ({id, name, imageUrlHome, price, quantity = 1}) => { 
    return {
        type: ADD_TO_CART,
        payload: {id, name, imageUrlHome, price, quantity}
    }
};

export const removeFromCart = (id) => {
    return {
        type: REMOVE_FROM_CART,
        payload: id,
    };
};

export const increaseCart = ({id, price}) => {
    return {
        type: INCREASE_CART,
        payload: {id, price}
    }
}

export const decreaseCart = ({id, price}) => {
    return {
        type: DECREASE_CART,
        payload: {id, price}
    }
};

export const setValue = ({fieldName, fieldValue}) => {
    return {
        type: SET_VALUE,
        payload: {fieldName, fieldValue}
    }
};

export const toggleCartVisibility = () => {
    return {
        type: "TOGGLE_CART_VISIBILITY"
    }
};