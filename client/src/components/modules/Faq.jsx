import style from "../css/Faq.module.css";
import { Link } from "react-router-dom";
import {GrInstagram} from "react-icons/gr";
import {BsFacebook} from "react-icons/bs";


const Faq = () => {

const instagramUrl = "https://www.instagram.com/";
const facebookUrl = "https://es-la.facebook.com/";

return(
    <div className={style.container}>
        <div className={style.containerFaq}> 
            <h1 className={style.title}> Frequently Asked Questions </h1>
            <div className={style.div}>
                <h3 className={style.question}> How to buy: </h3>
                <p className={style.response} > 1) Click on the cart icon that appears on each product.</p>
                <p className={style.response}> 2) In the cart window located in the menu, you will be able to see the selected product(s) in your cart. From there, you can add or remove quantities of the selected product.</p>
                <p className={style.response}> 3) Once you have chosen your ice creams, click on the "Begin Purchase" button to proceed with your purchase.</p>
                <p className={style.response}> 4)  You will need to log in by entering your email and a password. </p>
                <p className={style.response}> 5) You will be redirected to the "Purchase" window where you will need to enter your personal information, payment method, and confirm the purchase.</p>
                <p className={style.response}> 6) After clicking the "Make Payment" button, your purchase will be completed. </p>
            </div>

            <div className={style.div}>
                <h3 className={style.question}> Payment methods: </h3>
                <p className={style.response}> You can pay in cash, debit, or credit. We accept Visa, Mastercard, and American Express for up to 3 - 6 interest-free installments. </p>
            </div>

            <div className={style.div}>
                <h3 className={style.question}> Delivery times: </h3>
                <p className={style.response}> After making the purchase, we will contact you shortly to provide information about delivery and pickup times. </p>
            </div>

            {/* <div className={style.div}>
                <h3 className={style.question}> Order cancellation: </h3>
                <p className={style.response}> To cancel your order, click on the 'Cancellation Button' located in the 'Purchase' window, and we will contact you shortly to process the cancellation of your order. </p>
            </div> */}
            
            <div className={style.div}>
                <h3 className={style.question}> Customer service: </h3>
                <p className={style.response}> In case of any questions, inquiries, or opinions, please write to us through the 'Contact' section. We will get back to you as soon as possible. </p>
            </div>   
        </div>     

    <footer className={style.footer}>
        <h4 className={style.followUs}> Follow us on our social media! </h4>
        <div className={style.socialMedia}>
            <Link to={instagramUrl} target="_blank" rel="noopener noreferrer">
                <GrInstagram className={style.igLogo}/>
            </Link>
            <Link to={facebookUrl} target="_blank" rel="noopener noreferrer">
                <BsFacebook className={style.fbLogo} />
            </Link>
        </div>
        <h4 className={style.finalString}> © 2023 All rights reserved. </h4>
    </footer>
        
    </div>
)
};

export default Faq;
