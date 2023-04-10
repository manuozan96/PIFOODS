import React from "react";
import styles from './NavBar.module.css'
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar(){
    return(
        <div className={styles.nav}>
         <Link className={styles.letras} to="/favorites">My favorites 💖</Link>
         <SearchBar/>
         <Link className={styles.letras1} to="/create-recipes">Create your own recipe</Link>
        </div>
    )
};