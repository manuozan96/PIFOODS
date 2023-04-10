import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchNameRecipes } from "../actions/actions";
import styles from './SearchBar.module.css'

export default function SearchBar(){

const [name, setName] = useState('')
const dispatch = useDispatch()

function onSubmit(e){
    e.preventDefault()
   dispatch(searchNameRecipes(name))
};


function onInputChange(e){
    e.preventDefault()
    setName(e.target.value)
};

    return <div>
            <input className={styles.input} type="text" onChange={(e) => onInputChange(e)} placeholder="Search..." />
            <button className={styles.btn} type="submit" onClick={e => onSubmit(e)}>Search</button>
           </div>
};