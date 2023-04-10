//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Diets} = require('./src/db.js');
const axios = require ('axios');
const {API_KEY} = process.env;


const getAllDiets = async () => {
  const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
  const apiInfo = api.data.results.map( el => {
    return el.diets
    })
  const aux = apiInfo.flat()
  const results = new Set(aux)
  const aux2 = [...results, 'vegetarian']
  const preDiets = aux2.map( el => {
    return {
      name: el
    }
  })
  const diets = await Diets.findAll()
  return !diets.length ? await Diets.bulkCreate(preDiets) : diets;
}


// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await getAllDiets()
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
})
