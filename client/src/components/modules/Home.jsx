import style from "../css/Home.module.css";
import axios from "axios";
import Modal from "./Modal";
import CartData from "./CartData";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions";
import {LuIceCream} from "react-icons/lu";
import {CgIcecream} from "react-icons/cg";
import {TbMilkshake} from "react-icons/tb";
import {BsFacebook, BsCartPlus} from "react-icons/bs";
import {GrInstagram} from "react-icons/gr";


const Home = ({foundIceCreams, showSearchResults, setShowSearchResults}) => {
    
const instagramUrl = "https://www.instagram.com/";
const facebookUrl = "https://es-la.facebook.com/";
const cartItems = useSelector((state) => state.cartItems)
const dispatch = useDispatch();
const cartVisible = useSelector((state) => state.value.cartVisible)
const [iceCream, setIceCream] = useState([]);
const [filteredIceCream, setFilteredIceCream] = useState([]);
const [currentCategory, setCurrentCategory] = useState("all");
const [showModal, setShowModal] = useState(false);
const [selectedIceCream, setSelectedIceCream] = useState(null);
const navigate = useNavigate();
    
const handleDetail = (name) => {
    navigate(`/icecream/${name}`)
};

useEffect(() => {
    const URL = "http://localhost:3001/icecream";
    axios
    .get(URL)
    .then((response) => {
        setIceCream(response.data);
        setFilteredIceCream(response.data);
    })
    .catch((error) => console.log(error));
}, []);

const handleFilter = (category) => {
    if (category === "all") {
        setShowSearchResults(false);
        setFilteredIceCream(iceCream);
    } else {
    const URL = `http://localhost:3001/icecream/category/${category}`;
        axios
        .get(URL)
        .then((response) => {
            setFilteredIceCream(response.data);
            setShowSearchResults(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    setCurrentCategory(category);
};

const handleAddToCart = ({id, name, price, imageUrlHome}) => {
    dispatch(addToCart({id, name, price}))
    setSelectedIceCream({id, name, price, imageUrlHome})
    setShowModal(true);
};

return (
    <div className={style.container}>
        {cartVisible && (
            <div className={style.poput}>
                <CartData/>
            </div>
        )}

        {showModal && (
            <Modal showModal={showModal} setShowModal={setShowModal} selectedIceCream={selectedIceCream}/>
        )}

        <div className={style.buttonsFilter}>
            <span className={style.buttonAll} onClick={() => handleFilter("all")}>
                All
            </span>

            <span className={style.buttonCone} onClick={()=>handleFilter("cone")}>
                <LuIceCream/>
            </span>

            <span className={style.buttonPopsicle} onClick={()=>handleFilter("popsicle")}>
                <CgIcecream/>
            </span>

            <span className={style.buttonShake} onClick={()=>handleFilter("shake")}>
                <TbMilkshake/>
            </span>
        </div>

        {
        showSearchResults ? (
            <div className={style.containerSearch}>
            {
            foundIceCreams?.map((itemFound) => {
                return ( 
                <div className={style.card} key={itemFound.id}>                
                <img src={itemFound.imageUrlHome} alt={itemFound.name} className={style.image} />
                <h3 onClick={()=>handleDetail(itemFound.name)} className={style.name}> {itemFound.name} </h3>
                <p className={style.price}> {itemFound.price} USD </p>
                <div className={style.buttonCart} onClick={()=>handleAddToCart({id: itemFound.id, name: itemFound.name, price: itemFound.price, imageUrlHome: itemFound.imageUrlHome})}>
                    < BsCartPlus className={style.cart}/>
                </div>
                </div> 
                )
            })
            }
        </div>
        ) : (
            <div>
                <div className={style.containerIceCreams}> 
                {
                filteredIceCream.map((ice) => { 
                    return ( 
                        <div className={style.card} key={ice.id}>                
                            <img src={ice.imageUrlHome} alt={ice.name} className={style.image} />
                            <h3 onClick={()=>handleDetail(ice.name)} className={style.name}> {ice.name} </h3>
                            <p className={style.price}> {ice.price} USD </p>
                            <div className={style.buttonCart} onClick={()=>handleAddToCart({id:ice.id, name: ice.name, price: ice.price, imageUrlHome: ice.imageUrlHome})}>
                                < BsCartPlus className={style.cart}/>
                            </div>
                        </div>        
                    )    
                })
                }
                </div>
            </div>
        )
        }

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

export default Home;
