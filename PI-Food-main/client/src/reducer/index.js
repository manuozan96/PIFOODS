const initialState = {
    recipes : [],
    allRecipes : [],
    diets: [],
    detail: [],
    favorites: [],
};

function rootReducer(state = initialState, action) {
    switch(action.type){
        case "GET_RECIPES":
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            }
        case "GET_DIETS":
            return{
                ...state,
                diets: action.payload
            }
    
        case "SEARCH_RECIPES":
            return{
                ...state,
                recipes: action.payload
            }
            
        case "FILTER_CREATED":
            // const allRecipes = state.allRecipes
            const createdfilter = action.payload === "createdInDb" ? state.allRecipes.filter( el => el.createdInDb) : state.allRecipes.filter( el => !el.createdInDb)
            return{
                ...state,
                recipes: action.payload === "All" ? state.allRecipes : createdfilter
            }
        
        case "FILTER_BY_DIETS":
            const filterDiets = action.payload === "All" ?  state.allRecipes : 
            state.allRecipes.filter((el) => el.diets.includes(action.payload))
            return{
                ...state,
                recipes: filterDiets
            }

        case "ORDER_BY_NAME":
            let orderName = action.payload === "asc" ? state.recipes.sort((a, b) => {
              if(a.name > b.name){
                return 1;
              }
              if( b.name > a.name){
                return -1;
              }
              return 0;
            }) :
            state.recipes.sort((a, b) => {
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                recipes: orderName
            }
            
        case "POST_RECIPES":
        return{...state}     

        case "FILTER_BY_HEALTHSCORE":
            let healthOrden = action.payload === "mas" ? state.allRecipes.sort((a, b) => {
                if(a.healthScore > b.healthScore){
                  return 1;
                }
                if( b.healthScore > a.healthScore){
                  return -1;
                }
                return 0;
              }) :
              state.allRecipes.sort((a, b) => {
                  if (a.healthScore > b.healthScore){
                      return -1;
                  }
                  if (b.healthScore > a.healthScore){
                      return 1;
                  }
                  return 0;
              })
            return {
               ...state,
               recipes: healthOrden
            }
        case "GET_DETAIL":
            return{
                ...state,
                detail: action.payload
            }
        case "ADD_FAVORITE":
            return{
                ...state,
                favorites: [...state.favorites, action.payload],
                
            }

        default: return {...state}
    }
};

export default rootReducer;