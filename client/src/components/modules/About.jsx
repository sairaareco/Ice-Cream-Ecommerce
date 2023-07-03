import style from "../css/About.module.css";
import { Link } from "react-router-dom";
import {GrInstagram} from "react-icons/gr";
import {BsFacebook} from "react-icons/bs";



const About = () => {

const instagramUrl = "https://www.instagram.com/";
const facebookUrl = "https://es-la.facebook.com/";

    return(
        <div className={style.container}>
            <div className={style.containContainers}>
                <div>
                    <h1 className={style.title}> About me </h1>
                    <p className={style.text}> This ice cream e-commerce project is an online platform that allows users to explore and purchase a wide variety of ice cream flavors from the comfort of their homes. The application has been developed using several technologies to ensure efficient functionality and an attractive user experience. It is built based on technologies such as PostgreSQL, Sequelize, React.js, and CSS. </p>
                    <p className={style.text}> The combination of these technologies has enabled us to create an e-commerce platform with the following notable features: </p>
                    <p className={style.text}> 1) Product search and navigation: Users can easily explore different available ice cream flavors using search functions and categories to find their favorites. </p>
                    <p className={style.text}> 2 ) Shopping cart: Users can add ice creams to the shopping cart and manage quantities for each selected product. Additionally, the shopping cart displays an order summary and the total amount to pay. </p>
                    <p className={style.text}> 3 ) Payment process: We have implemented a payment flow using cash, credit card, and debit card payment options. Users can enter the necessary information and complete the purchasing process. </p>        
                </div>

                <div>
                    <h1 className={style.title}> Sobre mí </h1>
                    <p className={style.text}> Este proyecto de e-commerce de helados es una plataforma en línea que permite a los usuarios explorar y comprar una amplia variedad de sabores de helados desde la comodidad de sus hogares. La aplicación se ha desarrollado utilizando varias tecnologías para garantizar un funcionamiento eficiente y una experiencia de usuario atractiva.
                    Está creada en base a tecnologías como PostgreSQL, Sequelize, React.js y CSS. </p>
                    <p className={style.text}> La combinación de estas tecnologías nos ha permitido crear un e-commerce con las siguientes características destacadas: </p>
                    <p className={style.text}> 1 ) Búsqueda y navegación de productos: Los usuarios pueden explorar fácilmente los diferentes sabores de helados disponibles, utilizando funciones de búsqueda y categorías para encontrar sus favoritos. </p>
                    <p className={style.text}> 2 ) Carrito de compras: Los usuarios pueden agregar helados al carrito de compras y gestionar las cantidades de cada producto seleccionado. Además, el carrito de compras muestra el resumen de la orden y el total a pagar.</p>
                    <p className={style.text}> 3) Proceso de pago: Implementamos un flujo de pago utilizando las opciones de pago en efectivo, tarjeta de crédito y débito. Los usuarios pueden ingresar la información necesaria y completar el proceso de compra. </p>
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

export default About;
