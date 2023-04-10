import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {getAllRecipes, filterCreated, filterByDiets, orderByName, filterByHealthScore, getAllDiets} from '../actions/actions'
import Card from "./Card";
import Paginado from "./Paginado";
import styles from './Home.module.css'
import SideBar from "./SideBar";
import NavBar from './NavBar'

export default function Home(){

   const recipesState = useSelector((state) => state.recipes)
   console.log(recipesState);
   const dispatch = useDispatch()

   useEffect(() => {
   dispatch(getAllRecipes())
   dispatch(getAllDiets())
   }, [dispatch]);
      
   const [orden, setOrden] = useState("")
   const [health, setHealth] = useState("")
   const [currentPage, setCurrentPage] = useState(1)
   const [postsPerPage, setPostsPerPage] = useState(9)
   const lastPostIndex = currentPage * postsPerPage
   const firstPostsIndex = lastPostIndex - postsPerPage
   const currentPost = recipesState.slice(firstPostsIndex, lastPostIndex)

   function handleClick(e){
      e.preventDefault();
      dispatch(getAllRecipes());
   };

   function handleFilterCreated(e){
      dispatch(filterCreated(e.target.value))
   }

   
   function handleSort(e){
      e.preventDefault();
      dispatch(orderByName(e.target.value))
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`)
   }

   function handleSortHealth(e){
      e.preventDefault();
      dispatch(filterByHealthScore(e.target.value))
      setCurrentPage(1);
      setHealth(`Health ${e.target.value}`)
   }
   
   
   function handleFilterDiets(e){
      dispatch(filterByDiets(e.target.value))
   }
   
   return <div>

      <NavBar/>
      <SideBar/>
      <hr style={{ borderStyle: 'none'}} /> 

   <select className={styles.select} onChange={e => handleFilterCreated(e)} >
         <option value="All">See all</option>
         <option value="createdInDb">Created</option>
         <option value="api">Already exists</option>
   </select>

   <select className={styles.select} onChange={e => handleFilterDiets(e)}>
     <option value="All">Type of diet</option>
     <option value="gluten free">Gluten free</option>
     <option value="dairy free">Dairy free</option>
     <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
     <option value="vegan">Vegan</option>
     <option value="paleolithic">Paleolithic</option>
     <option value="primal">Primal</option>
     <option value="whole 30">Whole 30</option>
     <option value="pescatarian">Pescatarian</option>
     <option value="ketogenic">Ketogenic</option>
     <option value="fodmap friendly">Fodmap friendly</option>
     <option value="vegetarian">Vegetarian</option>
   </select>
    
   <select className={styles.select} onChange={e => handleSortHealth(e)}>
      <option value="All">Filter by healthy</option>
      <option value="mas" >+ health</option>
      <option value="menor">- health</option>
   </select>

   <select className={styles.select} onChange={e => handleSort(e)}>
      <option value="asc">Up</option>
      <option value="desc">Down</option>
   </select>
   
   <hr style={{ borderStyle: 'none'}} />
   
{
      currentPost.map((el) => ( 
         <ul >
         <li key={el.id}>
         <Link className={styles.link} key={el.id} to={`/detail/${el.id}`}>
         <Card className={styles.link} id={el.id} name={el.name} image={el.image} diets={el.diets}/>
         </Link>
         </li>
         </ul>
         ))
}
   <hr style={{ borderStyle: 'none'}} />
 <div> <Paginado totalPosts={recipesState.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/></div>
   <hr style={{ borderStyle: 'none'}} />
   <button onClick={handleClick} className={styles.btnReload}>go back</button>
</div>
};