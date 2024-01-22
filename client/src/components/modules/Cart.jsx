import React from 'react';
import style from "../css/Cart.module.css";
import { removeFromCart, increaseCart, decreaseCart } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import {RiDeleteBinLine} from "react-icons/ri";


const Cart = ({id, name, price, quantity}) => {

// eslint-disable-next-line
const cartItems = useSelector((state) => state.cart.cartItems);
const dispatch = useDispatch();

const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id))
};

const handleIncrease = ({id, price}) => {
    dispatch(increaseCart({id, price}))
};

const handleDecrease = ({id, price}) => {
    dispatch(decreaseCart({id, price}))
};

return(
    <div className={style.container}>
        <div className={style.containProduct}>
            <div className={style.divName}>
                <span className={style.name}> {name}</span>
            </div>

            <div className={style.containerQuantity}>
                <button className={style.buttonMenos} onClick={()=>handleDecrease({id, price})}> - </button>
                    <span className={style.number}> {quantity} </span>
                <button className={style.buttonMas} onClick={()=>handleIncrease({id, price})}> + </button>
            </div>  


            <div className={style.divPrice}> 
            <span className={style.price}> {price} USD  </span>          
            </div>


            <button className={style.buttonDelete} onClick={()=>handleRemoveFromCart(id)}>
                <RiDeleteBinLine/>
            </button>
        </div>
    </div>
    )
};

export default Cart;

