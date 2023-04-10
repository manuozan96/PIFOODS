import React from "react";
import { Link } from "react-router-dom";
import styles from './SideBar.module.css'

export default function SideBar(){
   return(
    <div className={styles.sidebar}>
        <ul >
                <Link className={styles.li} to="/home">Inicio</Link> 
           
        </ul>
    </div>
   )
};