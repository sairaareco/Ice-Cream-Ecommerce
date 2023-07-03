import style from "../css/Purchase.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import {VscEyeClosed, VscEye} from "react-icons/vsc";

const validateForm = (formData, setErrors) => {
    let emailError = "";
    let passwordError = "";

    if (!formData.email) {
        emailError = "Enter your email";
    } else if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,})+$/.test(formData.email)) {
        emailError = "Enter a valid email";
    }
    if (!formData.password) {
        passwordError = "Please, enter a password";
    } else if (formData.password.length < 6 || formData.password.length > 12) {
        passwordError = "Must be 6 - 12 characters";
    } else if (!/.*[0-9].*/.test(formData.password)) {
        passwordError = "Must have at least one number";
    }
    setErrors({ email: emailError, password: passwordError });
};

const Purchase = () => {

const navigate = useNavigate();
const cartItems = useSelector(state => state.cart.cartItems);
const [dataForm, setDataForm] = useState({email: "" , password: ""});
const [errors, setErrors] = useState({email:"" , password: ""});
const [showPassword, setShowPassword] = useState(false);
const { shoppingCartId } = useParams();


const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataForm((prevDataForm) => {
        const newDataForm = { ...prevDataForm, [name]: value }
        validateForm(newDataForm, setErrors)
        return newDataForm
    })
};

const handleSubmit = () => {
    const URL = `http://localhost:3001/user/${shoppingCartId}`;
    console.log(shoppingCartId);
    axios.post(URL, {email: dataForm.email, password: dataForm.password}) 
    .then((response) => {
        const userId = response.data.id;
        console.log("pedido enviado exitosamente")
        navigate(`/payment/${userId}`)
        })
    .catch((error) => console.log(error.message))
};

const handleBackCart = () => {
    navigate("/cart")
};

const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
        total += item.price 
    });
    return total.toFixed(2);
};

const handleTogglePassword = () => {
    setShowPassword(!showPassword);
};

return (
    <div className={style.container}>
        <h1 className={style.title}> Begin Purchase </h1>
            
        <div className={style.containBoxes}>
            <div  className={style.containerForm}>
                <h2 className={style.subtitleForm}> Enter your email and create a password </h2>
                <form action="">
                    <div className={style.containerForm}>
                        <label htmlFor="email" className={style.email}> Enter your email * </label>
                        <div className={style.containData}>
                            <input 
                                type="text" 
                                name="email" 
                                value={dataForm.email} 
                                onChange={handleInputChange}
                                className={style.input}
                                placeholder=""
                            />
                            <p className={style.validationEmail}> {errors.email} </p>
                        </div>

                        <span  onClick={handleTogglePassword} className={style.eyePass}>
                            { showPassword ? <VscEye /> : <VscEyeClosed /> }
                        </span>

                        <label htmlFor="password" className={style.pass}> Enter a password * </label>
                        <div className={style.containData}> 
                            <input 
                                type={ showPassword ? "text" : "password" } 
                                name="password" 
                                value={dataForm.password}
                                onChange={handleInputChange}
                                className={style.input}
                                placeholder=""
                            />
                            <p className={style.validationPass}> {errors.password} </p>
                        </div>
                    </div>
                </form> 
            </div>

            <div className={style.orderContainer}>
                <h2 className={style.subtitleOrder}> My order </h2>                
                {
                cartItems.map((item) => {
                    return (
                        <div key={item.id}>     
                        <img src={item.imageUrlHome} alt="" className={style.image}/>                   
                        <p className={style.name}> {item.name} </p>
                        <p className={style.quantity}> Quantity: {item.quantity} </p>
                        </div>
                    )
                })
                }
                <p className={style.totalPrice}> Total price: {calculateTotal(cartItems)} USD </p>
            </div>
        </div>

        <div className={style.buttons}>
            <button className={style.buttonBackCart} onClick={handleBackCart}> Back to Shopping Cart </button>
            <button 
                type="submit"
                disabled={!dataForm.email || !dataForm.password || errors.email || errors.password} 
                className={style.buttonContinue} 
                onClick={handleSubmit}> 
                    Continue 
            </button>
        </div>
    </div>
)
};

export default Purchase;


