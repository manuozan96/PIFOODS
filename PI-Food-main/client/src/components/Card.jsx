import React, { useEffect } from "react";
import styles from "./Card.module.css"
import {useDispatch, useSelector} from "react-redux"
import { useState } from "react";
import { deleteRecipe, addFavorite } from "../actions/actions";


export default function Card({name, image, diets, id}){
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)
    const [isFav, setIsFav] = useState(false)
    
   useEffect(() => {
    favorites.forEach((fav) => {
        if (fav.id === id)
        {
            setIsFav(true)
        }
    })
   }, [favorites])

    const handleFavorite = () => {
        if(isFav){
            setIsFav(false)
            dispatch(deleteRecipe(id))
        } else {
            setIsFav(true)
            dispatch(addFavorite({name, image, diets, id}))
        }
    }
        
    return(
        
        <div className={styles.container}>
            {
             isFav ? (
                <button className={styles.btnFav} onClick={handleFavorite}>💖</button>
             ) : (
                <button className={styles.btnFav} onClick={handleFavorite}>🤍</button>  
             )
            }
            <div className={styles.card}>
              <img src={image} alt='image not found'/>
            </div>
             <div className={styles.text}>
              <h3 className={styles.name}>{name}</h3>
            </div>
        <ul>
            <li  className={styles.text}>Diets: {diets}</li>
        </ul>
            
        </div>
    )
};