import { SET_VALUE, TOGGLE_CART_VISIBILITY } from "./actions";

const initialState = {
    cartVisible: false,
    fields: {
        email: "",
        name: "",
        street: "",
        number: "",
        zipCode: "",
        cardHolderName: "",
        paymentMethod: "",
        cardNumber: "",
        expirationDate: "",
        cvv: ""
    }
}

const valueReducer = (state = initialState, action) => {
    switch (action.type) {    
        case SET_VALUE:
            
            return {
                ...state,
                fields: { ...state.fields,
                        [action.payload.fieldName] : action.payload.fieldValue
                }
            }
            
        case TOGGLE_CART_VISIBILITY:
            return {
                ...state,
                cartVisible: !state.cartVisible
        }
        default:
        return {
            ...state
        }
    }
};

export default valueReducer;