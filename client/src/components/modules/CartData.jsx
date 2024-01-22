import React from 'react';
import style from "../css/CartData.module.css";
import axios from "axios";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleCartVisibility } from "../redux/actions";
import {BsCartX} from "react-icons/bs";
// eslint-disable-next-line
import {FaTimes} from "react-icons/fa";
// eslint-disable-next-line
const { Buffer } = require('buffer');

const CartData = () => {

const navigate = useNavigate();
const cartItems = useSelector(state => state.cart.cartItems);
const dispatch = useDispatch();
// eslint-disable-next-line
const cartVisible = useSelector((state) => state.value.cartVisible)

// eslint-disable-next-line
const handleOpenCart = () => {
    dispatch(toggleCartVisibility())
};

const handleBackHome = () => {
    navigate("/home")
};

const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
        total += item.price 
    });
    return total.toFixed(2);
};

const handlePurchase = async () => {
    const URL = "http://localhost:3001/shoppingCart";
    const iceCreamNames = cartItems.map((item) => item.name);
    const iceCreamQuantities = cartItems.map((item) => item.quantity);
    const iceCreamPrices = cartItems.map((item) => item.price);
    const totalPrice = calculateTotal(cartItems);
    const shoppingCartData = {
        iceCreamNames,
        iceCreamQuantities,
        iceCreamPrices,
        totalPrice,
    }
    try {
        const response = await axios.post(URL, shoppingCartData);
        const shoppingCartId = response.data.id;
        navigate(`/purchase/${shoppingCartId}`);
    } catch (error) {
        console.error({message: error.message});
    }
};

return(
    <div className={style.container}>
        {
        cartItems.length === 0 ? (
            <div className={style.cartContainer}>         
                <BsCartX className={style.cart}/>
                <p className={style.cartIsEmpty}> The cart is empty </p>
                <button className={style.buttonStartShopping} onClick={handleBackHome}> START SHOPPING </button>
            </div>            
        ) : (
            <ul className={style.containerAll}>
                <div className={style.containerSubtitles}>
                    <h3 className={style.subtitleProducts}> Products </h3>
                    <h3 className={style.subtitleQuantity}> Quantity </h3>
                    <h3 className={style.subtitlePrice}> Price </h3>                    
                    <h3 className={style.subtitleRemove}> Remove from cart </h3>
                </div>
                
            { 
            cartItems?.map((element, index) => {
                return <Cart 
                    key = {index}
                    id = {element.id}
                    name = {element.name}
                    price = {element.price}     
                    quantity = {element.quantity}      
                    imageUrlHome = {element.imageUrlHome}      
                    />
            })
            }
            <h3 className={style.totalPrice}> Total price: {calculateTotal(cartItems)} USD </h3>
            <div className={style.buttonsShopCart}>
                <button className={style.buttonToHome} onClick={handleBackHome}> Continue Shopping </button>
                <button className={style.buttonPurchase} onClick={handlePurchase}> Begin Purchase </button>
            </div>
            </ul>
        ) 
        }
    </div>
    )
};

export default CartData;

