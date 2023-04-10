const { Router } = require('express');
const express = require('express')
const morgan = require('morgan')
const axios = require('axios')
const {Recipe, Diets} = require('../db')
const {API_KEY} = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())
router.use(morgan('dev'))
//info de la api
const getApiInfo = async() => {
  const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
  const apiInfo = api.data.results.map( el => {
      return{
          id: el.id,
          name: el.title,
          image: el.image,
          summary: el.summary.replace(/<[^>]*>?/g, ''),
          healthScore: el.healthScore,
          step: el.analyzedInstructions[0]?.steps.map( el => {
            return { number: el.number, step: el.step}
          }),
          diets: el.diets.join(', ')
      }})
      return apiInfo
};
//info de mi db
const getDbInfo = async () => {
    return await Recipe.findAll({
      include: { model: Diets, 
      attributes: ['name'] }
    })
};
//dietas
const getAllDiets = async () => {
  const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
  const apiInfo = api.data.results.map( el => {
    return el.diets
    })
  
  const aux = apiInfo.flat()
  const results = new Set(aux)
  const aux2 = [...results, 'vegetarian']
  console.log(aux2);
  const preDiets = aux2.map( el => {
    return { name: el }
  })
  const diets = await Diets.findAll()
  return !diets.length ? await Diets.bulkCreate(preDiets) : diets;
}
//todo concatenado
const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo)
  return infoTotal;
};
//recetas y query
router.get('/recipes', async (req, res) => {
  const {name} = req.query;
  const allRecipes = await getAllInfo()
  if(name){
    let nameRecipe = await allRecipes.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
    nameRecipe.length ?
    res.status(200).send(nameRecipe) :
    res.status(404).send('Name not found')
  } else {
    res.status(200).send(allRecipes)
  };
});
//dietas
router.get('/diets', async (req, res) => {
const diets = await getAllDiets()
res.send(diets)
});
//post
router.post('/create-recipes', async (req, res) => {
 const {name, image, summary, diets, healthScore, step, createdInDb} = req.body
 const createRecipe = await Recipe.create({name, image, summary, diets, healthScore, step, createdInDb})

 const dietsDb = await Diets.findAll({ where: { name : diets}})
 
 createRecipe.addDiets(dietsDb)
 res.send('recipe created succesfully !')
});


router.get('/detail/:id', async (req, res) => {
  const {id} = req.params;
  const total = await getAllInfo()
  if(id){
    let recipeid = await total.filter( el => el.id == id)
    recipeid.length ?
    res.status(200).json(recipeid) :
    res.status(404).send(`${id} not found`)
  }



































  

  
// router.delete('/detail/:id', async (req, res) => {
//      const {id} = req.params;
     
//      const deleteRecipe = await Recipe.findByPk(id)
//      deleteRecipe.destroy()
  
//      res.status(200).send(deleteRecipe)
//   });
// router.put('/detail/:id', async (req, res) =>{
//   const allRecipes = getAllInfo()
//    const {id} = req.params;
//    const {recipe} = req.body;
//    //por body le paso lo que quiero updatear
//    const recipeUpdate = await allRecipes.update(recipe, {
//     where:{
//       id: id
//     }
//    })
//   res.json('success')
// })

});



module.exports = router;
