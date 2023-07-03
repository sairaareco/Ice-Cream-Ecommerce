import style from "../css/Modal.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {FaCheck} from "react-icons/fa";


const Modal = ({setShowModal, selectedIceCream}) => {

const navigate = useNavigate()
const cartVisible = useSelector((state) => state.value.cartVisible);

const handleHome = () => {
    setShowModal(false)
    navigate("/home")
};

const handleGoToCart = () => {
    navigate('/cart');
};


return (
    <div className={style.container}>
        <div className={style.content}> 
            <div className={style.containerTitle}>
                <div className={style.check}>
                    <FaCheck/>
                </div>
                <h1 className={style.title}> Added to Cart!</h1>
            </div>

            <div className={style.iceCreamContainer}>
                <img src={selectedIceCream.imageUrlHome} alt="" className={style.image}/>
                <h3 className={style.name}> {selectedIceCream.name } </h3>
                <p className={style.price}> {selectedIceCream.price} USD </p>
            </div>

            <button className={style.buttonHome} onClick={handleHome}> Continue Shopping </button>
            <button className={style.buttonCart} onClick={handleGoToCart}> Go to Cart </button>
        </div>
    </div>
)
};

export default Modal;