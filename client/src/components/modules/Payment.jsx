import style from "../css/Payment.module.css";
import axios from "axios";
import ModalPay from "./ModalPay";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../redux/actions";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ReactCreditCards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


const Payment = () => {

const fields = useSelector((state) => state.value.fields);
const dispatch = useDispatch();
const { userId } = useParams();
const [paymentType, setPaymentType] = useState("");
const [ showModalPay, setShowModalPay ] = useState(false);
const [errors, setErrors] = useState({
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
});

const paymentCash = paymentType === "cash" || paymentType === "";

const validatePayment = (fieldName, fieldValue) => {
    let newErrors = { ...errors };

    if (!fields.email || !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,})+$/.test(fields.email)) {
        newErrors.email = "Enter a valid email";
    } else {
        newErrors.email = "";
    }

    if (!fields.name || !/^[a-zA-Z ]+$/.test(fields.name)) {
        newErrors.name = "Enter your name";
    } else {
        newErrors.name = "";
    }

    if (!fields.street || !/^[a-zA-Z ]+$/.test(fields.street)) {
        newErrors.street = "Enter a valid street";
    } else {
        newErrors.street = "";
    }

    if (!fields.number || !/^[0-9]+$/.test(fields.number)) {
        newErrors.number = "Enter a valid number";
    } else {
        newErrors.number = "";
    }

    if (!fields.zipCode || !/^[0-9]+$/.test(fields.zipCode)) {
        newErrors.zipCode = "Invalid zip code";
    } else {
        newErrors.zipCode = "";
    }

    if (paymentType === "credit" || paymentType === "debit") {

        if (!fields.cardHolderName || !/^[a-zA-Z ]+$/.test(fields.cardHolderName)) {
            newErrors.cardHolderName = "Enter a card name";
        } else {
            newErrors.cardHolderName = "";
        }
    
        if (!fields.cardNumber || !/^[0-9]+$/.test(fields.cardNumber)) {
            newErrors.cardNumber = "Enter a valid card number";
        } else {
            newErrors.cardNumber = "";
        }
    
        if (!fields.expirationDate || !/^[0-9]+$/.test(fields.expirationDate)) {
            newErrors.expirationDate = "Enter a valid date";
        } else {
            newErrors.expirationDate = "";
        }
        
        if (!fields.cvv || !/^[0-9]+$/.test(fields.cvv)) {
            newErrors.cvv = "Invalid CVV";
        } else {
            newErrors.cvv = "";
        }
    }
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    return hasErrors;
};

const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    dispatch(setValue( {fieldName, fieldValue }))
    validatePayment(fieldName, fieldValue);
};

const handleFocusChange = (event) => {
    const { name } = event.target; 
    dispatch(setValue({ fieldName: "focus", fieldValue: name === "cvv" ? "cvc" : name })); 
};

const handleChangePaymentMethod = (event) => {
    setPaymentType(event.target.value);
    dispatch(setValue({ fieldName: "paymentMethod", fieldValue: event.target.value }));
};

const handleSendPayment = (userId, fieldName, fieldValue) => {
    const hasErrors = validatePayment(fieldName, fieldValue);

    if (!hasErrors) { 
    const URL = `http://localhost:3001/payment/${userId}`;
    const paymentData = {
        email: fields.email || null,
        name: fields.name || null,
        street: fields.street || null,
        number: fields.number || null,
        zipCode: fields.zipCode || null,
        cardHolderName: fields.cardHolderName || null,
        paymentMethod: fields.paymentMethod,
        cardNumber: fields.cardNumber || null,
        expirationDate: fields.expirationDate || null,
        cvv: fields.cvv || null
    }

    axios.post(URL, paymentData)
    .then((response) => { 
        console.log(response.data)
        setShowModalPay(true)
    })
    .catch((error) => console.log({error: error.message}))
    } else {
        window.alert("Missing required information");
    }
};

return(
    <div className={style.container}>
    { showModalPay && <ModalPay setShowModalPay={setShowModalPay}/> }
        <h3  className={style.title}> Payment Method </h3>       
        {
        paymentCash && ( 
            <div className={style.containerPersonalInformation}>
                <h3 className={style.subtitlePersonal}> Personal Information </h3>
                <input type="text" 
                    placeholder="" 
                    className={style.inputEmail} 
                    value={fields.email} 
                    name="email"
                    onChange={handleChange}
                />
                <label htmlFor="" 
                    className={ `${style.titleEmail} ${ fields.email ? style.titleEmailActive :''}`}
                > Email </label>
                <span className={style.errorEmail}>{errors.email}</span>
                    
                <input type="text" 
                    placeholder="" 
                    className={style.inputName}
                    onChange={handleChange} 
                    value={fields.name} 
                    name="name"
                />
                <label htmlFor="" 
                    className={`${style.titleName} ${ fields.name ? style.titleNameActive : ''}`}> Name </label>
                <span className={style.errorName}>{errors.name}</span>
                
                <input type="text" 
                    placeholder="" 
                    className={style.inputStreet}
                    onChange={handleChange} 
                    value={fields.street}
                    name="street"
                    />
                <label htmlFor="" 
                    className={`${style.titleStreet} ${fields.street ? style.titleStreetActive : ""}`}> Street </label>
                <span className={style.errorStreet}>{errors.street}</span>

                <div className={style.box}>
                    <input type="text" 
                        placeholder="" 
                        className={style.inputNumber} 
                        onChange={handleChange} 
                        value={fields.number}
                        name="number"
                        maxLength="5"
                    />
                    <label htmlFor="" 
                        className={`${style.titleNumber} ${ fields.number ? style.titleNumberActive: ''}`}> Number </label>
                    <span className={style.errorNumber}>{errors.number}</span>

                    <input type="text" 
                        placeholder="" 
                        className={style.inputZipCode} 
                        onChange={handleChange} 
                        value={fields.zipCode}
                        name="zipCode"
                        maxLength="5"
                    />
                    <label htmlFor="" 
                        className={`${style.titleZipCode} ${fields.zipCode ? style.titleZipCodeActive : ""}`}> Zip code </label>
                    <span className={style.errorZipCode}>{errors.zipCode}</span>

                    <select className={style.inputPaymentMethod} defaultValue={paymentType} 
                        onChange={handleChangePaymentMethod}
                        >
                        <option value="" disabled> Payment Method </option>
                        <option value="cash"> CASH </option>
                        <option value="credit"> CREDIT </option>
                        <option value="debit"> DEBIT </option>
                    </select>
                </div>              
            </div>
        )}

        {
        paymentType === "credit" &&
        (
        <div className={style.containerCardDetails}>  
        <h3 className={style.subtitlePersonal}> Card Details </h3>
        
        <ReactCreditCards
            number= {fields.cardNumber}
            name= {fields.cardHolderName}
            expiry= {fields.expirationDate}
            cvc= {fields.cvv}
            focused={fields.focus}
        />
        
        <div className={style.dataCredit}>
            <input type="text" 
                placeholder="" 
                className={style.inputCardHolderName}
                onChange={handleChange} 
                onFocus={handleFocusChange}
                value={fields.cardHolderName}
                name="cardHolderName"
                maxLength= "30"
            />
            <label htmlFor="" 
                className={`${style.titleCardHolderName} ${fields.cardHolderName ? style.titleCardHolderNameActive : ""}`}> Card holder name </label>
            <span className={style.errorCardHolderName}>{errors.cardHolderName}</span>
        
            <input type="text" 
                placeholder="" 
                className={style.inputCardNumber}
                onChange={handleChange} 
                onFocus={handleFocusChange}
                value={fields.cardNumber}
                name="cardNumber"
                maxLength= "16"
            />
            <label htmlFor="" 
                className={`${style.titleCardNumber} ${ fields.cardNumber ? style.titleCardNumberActive : ""}`}> Card number </label>
            <span className={style.errorCardNumber}>{errors.cardNumber}</span>
        </div>
        <div className={style.containData}>
            <select name="" id="" className={style.installments} defaultValue="" >
                <option value="" disabled> Installments </option>
                <option value="one"> one </option>
                <option value="three"> three </option>
                <option value="six"> six </option>
            </select>

            <input type="text" 
                placeholder="" 
                className={style.inputExpirationDate}
                onChange={handleChange} 
                onFocus={handleFocusChange}
                value={fields.expirationDate}
                name="expirationDate"
                maxLength= "4"
            />
            <label htmlFor="" 
                className={`${style.titleExpirationDateCredit} ${ fields.expirationDate ? style.titleExpirationDateActiveCredit : ""}`}> Expiration date </label>
            <span className={style.errorExpirationDateCredit}>{errors.expirationDate}</span>

            <input type="text" 
                placeholder="" 
                className={style.inputCvv}
                onChange={handleChange} 
                onFocus={handleFocusChange}
                value={fields.cvv}
                name="cvv"
                maxLength= "4"
            />   
            <label htmlFor="" 
                className={`${style.titleCvvCredit} ${ fields.cvv ? style.titleCvvActiveCredit : ""}`}> cvv </label>  
            <span className={style.errorCvvCredit}>{errors.cvv}</span>
            </div>
        </div>  
        )}

        {
        paymentType === "debit" && ( 
            <div className={style.containerCardDetails}> 
            <h3 className={style.subtitlePersonal}> Card Details </h3>

                <ReactCreditCards
                    number= {fields.cardNumber}
                    name= {fields.cardHolderName}
                    expiry= {fields.expirationDate}
                    cvc= {fields.cvv}
                    focused={fields.focus}
                />

            <div className={style.dataCredit}>
                <div>
                    <input type="text" 
                        placeholder="" 
                        className={style.inputCardHolderName}
                        onChange={handleChange} 
                        onFocus={handleFocusChange}
                        value={fields.cardHolderName}
                        name="cardHolderName"
                        maxLength= "30"
                    />
                    <label htmlFor="" 
                        className={`${style.titleCardHolderName} ${fields.cardHolderName ? style.titleCardHolderNameActive : ""}`}> Card holder name </label>
                    <span className={style.errorCardHolderName}>{errors.cardHolderName}</span>

                    <input type="text" 
                        placeholder="" 
                        className={style.inputCardNumber}
                        onChange={handleChange} 
                        onFocus={handleFocusChange}
                        value={fields.cardNumber}
                        name="cardNumber"
                        maxLength= "16"
                    />
                    <label htmlFor="" 
                        className={`${style.titleCardNumber} ${ fields.cardNumber ? style.titleCardNumberActive : ""}`}> Card number </label>
                    <span className={style.errorCardNumber}>{errors.cardNumber}</span>
                </div> 

                <div className={style.containData}>
                    <input type="text" 
                        placeholder="" 
                        className={style.inputExpirationDate}
                        onChange={handleChange} 
                        onFocus={handleFocusChange}
                        value={fields.expirationDate}
                        name="expirationDate"
                        maxLength= "4"
                    />
                    <label htmlFor="" 
                        className={`${style.titleExpirationDateDebit} ${ fields.expirationDate ? style.titleExpirationDateActiveDebit : ""}`}> Expiration date </label>
                    <span className={style.errorExpirationDateDebit}>{errors.expirationDate}</span>

                    <input type="text" 
                        placeholder="" 
                        className={style.inputCvv}
                        onChange={handleChange} 
                        onFocus={handleFocusChange}
                        value={fields.cvv}
                        name="cvv"
                        maxLength= "4"
                    />   
                    <label htmlFor="" 
                        className={`${style.titleCvvDebit} ${ fields.cvv ? style.titleCvvActiveDebit : ""}`}> cvv </label>  
                    <span className={style.errorCvvDebit}>{errors.cvv}</span>
                </div>
            </div> 
            </div>
        )}

        <div className={style.centerButton}>
            <button className={style.buttonMakePayment} onClick={()=>handleSendPayment(userId)}> MAKE PAYMENT </button>
        </div>
        
    </div>
)
};

export default Payment;

