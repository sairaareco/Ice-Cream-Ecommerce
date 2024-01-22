import React from 'react';
import style from "../css/ModalPay.module.css";

const ModalPay = ({setShowModalPay}) => {

const handleSent = () => {
    setShowModalPay(false);
};


return(
    <div className={style.container}>
        <div className={style.content}>
            <p className={style.title}> Order placed successfully. We will contact you shortly to arrange the delivery. </p>
            <p className={style.title}>  Thank you for trusting us! </p>
            <div className={style.buttonContainer}>
                <button onClick={handleSent} className={style.button}> Accept </button>
            </div>            
        </div>    
    </div>
)
};

export default ModalPay;

