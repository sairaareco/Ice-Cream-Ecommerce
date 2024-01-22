import React from 'react';
import style from "../css/IceCreamDet.module.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";

const IceCreamDetail = () => {
const [iceCreamDet, setIceCreamDet] = useState()
const { name } = useParams();
const navigate = useNavigate();

useEffect(() => {
    const getIceCream = async () => { 
        const URL = "http://localhost:3001/icecream";
        axios(`${URL}/${name}`)
            .then((response) =>  setIceCreamDet(response.data))
            .catch(error => console.log(error.message))
    }
    getIceCream()
}, [name])

const handleHome = () => {
    navigate("/home")
};

return(
    <div className={style.container}>
        {iceCreamDet ? 
            (<div className={style.card}>
                <button className={style.buttonBackHome} onClick={handleHome}> Back to Home </button>
                <img src={iceCreamDet.imageUrl} alt="" className={style.image}/>
                <div className={style.data}> 
                    <h2 className={style.name}> {iceCreamDet.name} </h2>
                    <h3 className={style.flavorTitle}>Flavors</h3>
                    <p className={style.flavors}> {iceCreamDet.flavors} </p>
                    <h3 className={style.nutFacts}>Nutritional Facts</h3>
                    <p className={style.protein}>Protein {iceCreamDet.protein}</p>
                    <p className={style.calories}>Calories {iceCreamDet.calories}</p>
                    <p className={style.totalFat}>Total Fat {iceCreamDet.totalFat}</p>
                    <p className={style.price}> Price {iceCreamDet.price} USD </p>
                    <p className={style.description}> {iceCreamDet.description} </p>  
                </div>   
            </div>
            ) : (
                <h2> Loading... </h2>
                )  
            }
    </div>
)
};

export default IceCreamDetail;
