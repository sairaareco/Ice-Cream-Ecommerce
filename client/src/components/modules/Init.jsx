import style from "../css/Init.module.css"
import { useNavigate } from "react-router-dom";


const Init = () => {
const navigate = useNavigate();

const handleGetStarted = () => {
    navigate("/home")
};

    return(
        <div className={style.containt}>
            <h1 className={style.title}> Scoops Galore </h1>
            <div className={style.containerText}>
                <h2 className={style.subtitle}> Large assortment of ice cream </h2>            
                <p className={style.text}> Having tried ice cream once, you will not be able to deny yourself in the future . </p>
                <button onClick={handleGetStarted} className={style.button}> Get Started </button>
            </div>
        </div>
    )
};

export default Init;

