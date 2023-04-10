import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllDiets, postRecipes } from "../actions/actions";
import styles from './Form.module.css'
import SideBar from "./SideBar";
import NavBar from './NavBar'


export default function Form(){

const [recipe, setRecipe] = useState({
        name: "",
        image: "",
        summary: "",
        healthScore: 0,
        step: "",
        diets: []
});

const stateDiets = useSelector((state) => state.diets)
const dispatch = useDispatch()
const history = useHistory()

useEffect(() => {
  dispatch(getAllDiets())
}, []);


function handleChange(e){
  setRecipe({
    ...recipe,
    [e.target.name]: e.target.value
  });
setErrForm(validate(recipe))
};

function handleDiets(e){
setRecipe({
  ...recipe,
  diets: [...recipe.diets, e.target.value]
  });
};
console.log(recipe);


function handleSubmit(e){
e.preventDefault()
dispatch(postRecipes(recipe))
setErrForm(validate(recipe))
setRecipe({
  name: "",
  image: "",
  summary: "",
  healthScore: 0,
  step: "",
  diets: []
});
alert('recipe create succesfully!')
history.push('/home')
};

const [errForm, setErrForm] = useState({})



function validate(recipe){
  let errors = {}
  if(!recipe.name) errors.name = 'you need to complete this step'
  if(!recipe.image) errors.image = 'you need to complete this step'
  if(!recipe.summary) errors.summary = 'you need to complete this step'
  if(!recipe.healthScore) errors.healthScore = 'you need to complete this step'
  if(!recipe.diets) errors.diets = 'you need to complete this step'
  if(!recipe.step) errors.step = 'you need to complete this step'
  
  return errors;
};



  return <div>
     <NavBar/>
    <hr style={{ borderStyle: 'none'}} />
    <hr style={{ borderStyle: 'none'}} />
    <SideBar/> 
    <h1 className={styles.h11} >Create your recipe</h1>
    <div>
     <form onSubmit={e => handleSubmit(e)}>
          <div>
    
          <input placeholder="Name" className={styles.input} type="text" name="name" value={recipe.name} onChange={e=> handleChange(e)}></input>
          {errForm.name ? (<h4><small>{errForm.name}</small></h4>) : (false)}
          <hr style={{ borderStyle: 'none'}} />
 

          <input placeholder="Image" className={styles.input} type="text" name= "image" value={recipe.image} onChange={e=> handleChange(e)}></input>
          {errForm.image ? (<h4><small>{errForm.image}</small></h4>) : (false)}
          <hr style={{ borderStyle: 'none'}} />
   
          <input placeholder="Summary" className={styles.input} type="text" name="summary" value={recipe.summary} onChange={e=> handleChange(e)}></input>
          {errForm.summary ? (<h4><small>{errForm.summary}</small></h4>) : (false)}
          <hr style={{ borderStyle: 'none'}} />
          
          <input placeholder="Health score" className={styles.input} type="text" name="healthScore" value={recipe.healthScore} onChange={e=> handleChange(e)}></input>
          {errForm.healthScore ? (<h4><small>{errForm.healthScore}</small></h4>) : (false)}
          <hr style={{ borderStyle: 'none'}} />
          <hr style={{ borderStyle: 'none'}} />
          <textarea placeholder="Step by step" className={styles.textarea} type="text" name="step" value={recipe.step} onChange={e=> handleChange(e)}></textarea>
          {errForm.step ? (<h4><small>{errForm.step}</small></h4>) : (false)}
          
          <hr style={{ borderStyle: 'none'}} />
          <label  className={styles.label} >Select one or more diets</label>
          <hr style={{ borderStyle: 'none'}} />
          <select className={styles.select} name="diets" onChange={e => handleDiets(e)}>
          
            {
              stateDiets.map((el) => (
                
                <option value={el.name}>{el.name}</option>
              ))
            };
          </select>

          <hr style={{ borderStyle: 'none'}} />

          <button className={styles.btnCreate} type="submit">Create</button>

          </div>
     </form>
    </div>
  </div>
};