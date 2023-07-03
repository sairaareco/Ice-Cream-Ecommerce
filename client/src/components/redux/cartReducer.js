import { ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, INCREASE_CART } from "./actions";

const initialState = {
    cartItems : [],
    cartItemsPrice: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
                cartItemsPrice: [...state.cartItemsPrice, action.payload.price]
            }
        case REMOVE_FROM_CART:
            const deletedItem = state.cartItems.filter((item) => item.id !== action.payload)
                return {
                    ...state,
                    cartItems: deletedItem,
                    cartItemsPrice: deletedItem
                }
        case INCREASE_CART: 
            const itemToUpdate = state.cartItems.find((item) => item.id === action.payload.id);
            const itemPrice = state.cartItemsPrice.find((price, index) => index === state.cartItems.indexOf(itemToUpdate));            
            if (itemToUpdate && itemPrice) {
                itemToUpdate.quantity += 1;
                itemToUpdate.price = itemToUpdate.quantity * itemPrice;
            }
            return {
                ...state,
                cartItems: [...state.cartItems],
                cartItemsPrice: [...state.cartItemsPrice]
        };
        case DECREASE_CART:
            const itemToDecrease = state.cartItems.find((item)=> item.id === action.payload.id)
            const priceItem = state.cartItemsPrice.find((price, index)=> index === state.cartItems.indexOf(itemToDecrease))
            if (itemToDecrease && itemToDecrease.quantity > 1) {
                itemToDecrease.quantity -= 1;
                itemToDecrease.price = itemToDecrease.quantity * priceItem
            }
            return {
                ...state,
                cartItems: [...state.cartItems]
            }       
        default:
            return {
                ...state
            }
    }
};


export default cartReducer;

