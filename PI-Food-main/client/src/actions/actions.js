import axios from 'axios'

//Traer recipes desde base de datos
export const getAllRecipes = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/recipes")
        dispatch({
            type: "GET_RECIPES",
            payload: response.data
        })
}};

export const getAllDiets = () => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/diets")
        dispatch({
            type: "GET_DIETS",
            payload: response.data
        })
    }};

//buscar por name en searchBar
export const searchNameRecipes = (name) => {
        return async (dispatch) => {
            const response = await axios.get("http://localhost:3001/recipes?name=" + name)
            dispatch({
                type: "SEARCH_RECIPES",
                payload: response.data
            })
}};

export const postRecipes = (payload) => {
    return async (dispatch) => {
        const response = await axios.post("http://localhost:3001/create-recipes", payload)
        console.log(response);
        return response;
    }
}

//creados o database
export const filterCreated = (payload) => {
    return{
        type: "FILTER_CREATED",
        payload
    }
};

//tipos de dietas
export const filterByDiets = (payload) => {
    console.log(payload);
    return{
        type: "FILTER_BY_DIETS",
        payload
    }};
//ordenar por nombre 
export const orderByName = (payload) => {
    return{
        type: "ORDER_BY_NAME",
        payload
    }
};

//healthscore
export const filterByHealthScore = (payload) => {
    return{
        type: "FILTER_BY_HEALTHSCORE",
        payload
    }
};

export const getDetail = (id) => {
    return async (dispatch) => {
        const response = await axios.get("http://localhost:3001/detail/" + id )
        return dispatch({
            type: "GET_DETAIL",
            payload: response.data
        });
    }
}

export const addFavorite = (id) => {
    return{
        type: "ADD_FAVORITE",
        payload: id
    }
};

export const deleteRecipe = (id) => {
    return{
        type: "DELETE_FAV",
        payload: id
    }
}