import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css"

export default function Landing(){
    return(
        <div className={styles.container} >
            <div>

            <hr style={{ borderStyle: 'none'}} />
           
            </div>
            <hr style={{ borderStyle: 'none'}} />


            <Link to ='/home'>
                <button className={styles.btn}>GET STARTED</button>
            </Link>
        </div>  
    )
}