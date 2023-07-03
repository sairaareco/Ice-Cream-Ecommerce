import style from "../css/Contact.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import {GrInstagram} from "react-icons/gr";
import {BsFacebook} from "react-icons/bs";


const validateContact = (infoContact, setErrors) => {
    let nameError = "";
    let emailError = "";
    let messageError = "";

    if (!infoContact.name) {
        emailError = "Please, enter your name";
    }
    if (!infoContact.email) {
        emailError = "Please, put your email";
    }
    if (!infoContact.message) {
        emailError = "Send us your message!";
    }
    setErrors({ name: nameError, email: emailError, message: messageError });
};


const Contact = () => {

const instagramUrl = "https://www.instagram.com/";
const facebookUrl = "https://es-la.facebook.com/";
const [infoContact, setInfoContact] = useState({name: "", email: "", message:""})
const [errors, setErrors] = useState({name: "", email: "", message:""})

const handleChange = (event) => {
    const { name, value } = event.target;
    setInfoContact((prevInfoContact) => {
        const newInfoContact = { ...prevInfoContact, [name]: value }
        validateContact( newInfoContact, setErrors)
        return  newInfoContact
    })
};

const handleSubmit = (event) => {
    event.preventDefault()
    window.alert("Thank you for your message! We will contact you shortly.");
    console.log(infoContact);
};

    return(
        <div className={style.container}>
            <h1 className={style.title}> Contact Form</h1>
            <h2  className={style.subtitle}>We value your opinion! Send us your message.</h2>
            <form className={style.form}>
                <div className={style.containerForm}>
                    <label htmlFor="" className={style.name}> Name: </label>
                    <input className={style.typeName} 
                        type="text" 
                        value={infoContact.name}
                        name="name"
                        placeholder=""
                        onChange={handleChange}
                        />                    

                    <label htmlFor="" className={style.email}> Email: </label>
                    <input className={style.typeEmail} 
                        type="email" 
                        value={infoContact.email}
                        name="email"
                        placeholder=""
                        onChange={handleChange}
                        />                    

                    <label htmlFor="" className={style.message}> Message: </label>
                    <textarea className={style.typeMessage} 
                        type="text" 
                        value={infoContact.message}
                        name="message"
                        placeholder=""
                        onChange={handleChange}
                    />

                    <button className={style.buttonSubmit} 
                        onClick={handleSubmit}
                        disabled={!infoContact.name || !infoContact.email || !infoContact.message || errors.name || errors.email || errors.message}
                        > Submit </button>
                </div>
            </form>
        
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

export default Contact;