import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import { getDetail } from "../actions/actions";
import styles from './Detail.module.css'
import SideBar from "./SideBar"
import NavBar from "./NavBar" 

export default function Detail(props){
     
     const dispatch = useDispatch()
     useEffect(() => {
        dispatch(getDetail(props.match.params.id))
     }, [dispatch])
    
     const myDetail = useSelector((state) => state.detail)
     console.log(myDetail);
     return(
        <div>
            <NavBar/>
            <SideBar />
           {
            myDetail.length>0 ?
            <div className={styles.div} >

                <h1 className={styles.name}>{myDetail[0].name}</h1>

                <img src={myDetail[0].image}/>

                <h2>💖 Health Score: {myDetail[0].healthScore}</h2>

                <p className={styles.detail}>{myDetail[0].summary}</p>

                <p className={styles.diets}>{myDetail[0].diets}</p>

                <h1 className={styles.step}> Step by step</h1>
                <h1 className={styles.st}> {myDetail[0].step ? myDetail.step : myDetail[0].step.map(el => {
                    return <div>${`${el.step}`}</div>
                })}</h1>

                <h6 className={styles.id}>Id: {myDetail[0].id}</h6>
            </div> 
            : <p className={styles.loader}></p>
           }
            <hr style={{ borderStyle: 'none'}} />
            <hr style={{ borderStyle: 'none'}} />
            <hr style={{ borderStyle: 'none'}} />

        <Link to="/home">
            <button className={styles.btn}>Go back</button>
        </Link>
        </div>
    )

};

