import React from "react";
import styles from "./Favorites.module.css"
import { useSelector } from "react-redux";
import Card from "./Card";
import SideBar from "./SideBar";
import NavBar from "./NavBar"

 const Favorites = () => {
    
    const favorites = useSelector((state) => state.favorites)
    console.log(favorites);
    return(
        <div>
            <NavBar/>
            <SideBar/>
            <h1 className={styles.title}>My favorites recipes:</h1>
            
         {
            favorites?.map((el) => {
                return (
                     <div>
                     <Card 
                     image={el.image}
                     name={el.name} 
                     diets={el.diets} 
                     key={el.id}/>
                     </div>
                ) 
            })
         }
        </div>
    )
}

export default Favorites;