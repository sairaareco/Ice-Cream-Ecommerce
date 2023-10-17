import style from "../css/NavBar.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {GoSearch} from "react-icons/go";
import {BsCart} from "react-icons/bs";
import {FaBars} from "react-icons/fa"


const NavBar = ({setFoundIceCreams, setShowSearchResults}) => {

// const cartItems = useSelector(state => state.cart.cartItems);
// const cartVisible = useSelector((state) => state.value.cartVisible)
// const dispatch = useDispatch();
const [searchTerm, setSearchTerm] = useState("");
const navigate = useNavigate();
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
};

const handleOpenCart = () => {
    navigate("/cart")
};

const handleChange = (event) => {
    setSearchTerm(event.target.value)
};

const searchIceCreams = async () => { 
    try {
        const URL = "http://localhost:3001/search?searchTerm=";
        const response = await axios(`${URL}${encodeURIComponent(searchTerm)}`);
        const iceCreams = response.data;

        setFoundIceCreams(iceCreams);
        setShowSearchResults(true);
        } catch (error) {
        console.log({ message: error.message });
    }
};

const handleSubmit = (event) => {
    event.preventDefault();
    searchIceCreams();
};


return(
    <div className={style.menu}>            
        <Link to="/home" className={style.item}> HOME </Link>
        <Link to="/faq" className={style.item}> FAQ </Link> 
        <Link to="/contact" className={style.item}> CONTACT </Link> 
        <Link to="/about" className={style.item}> ABOUT ME </Link> 


    <div className={style.mobileMenuIcon} onClick={toggleMobileMenu}>
                < FaBars/>
            </div>
        {isMobileMenuOpen && (
            <div className={style.mobileMenu}>
                <Link to="/home" className={style.mobileItem}> HOME </Link>
                <Link to="/faq" className={style.mobileItem}> FAQ </Link>
                <Link to="/contact" className={style.mobileItem}> CONTACT </Link>
                <Link to="/about" className={style.mobileItem}> ABOUT ME </Link>
            </div>
        )}


        <div className={style.containerSearch}>
            <input type="text" value={searchTerm} onChange={handleChange} placeholder=" Ice Cream Search" className={style.input}/>

            <button type="submit" className={style.buttonSearch} onClick={handleSubmit}>
                < GoSearch/>
            </button>
        </div>
            
        <div className={style.cart} onClick={handleOpenCart}>
            < BsCart/>
            <span className={style.numberCart}> </span>
        </div>
    </div>
)
};

export default NavBar;
