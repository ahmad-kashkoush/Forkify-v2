import { API_URL } from './config.js'
import { getJson } from './helpers.js'
export const state = {
    recipe: {},
    searchedRecipes: {},
}
const createRecipeObject = function (recipe) {
    return {
        title: recipe.title,
        id: recipe.id,
        imageUrl: recipe.image_url,
        sourceUrl: recipe.source_url,
        publisher: recipe.publisher,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients
    }
}
export const loadRecipe = async function (id) {
    try {

        const data = await getJson(`${API_URL}/${id}`);
        // updating recipe object
        const { recipe } = data.data;
        state.recipe = createRecipeObject(recipe);
        // console.log(state.recipe);

    } catch (err) {
        throw (err);
    }
}

export const loadSearchResults = async function (foodName) {
    try {
        const data = await getJson(`${API_URL}?search=${foodName}`);
        console.log(data);
        const { recipes } = data.data;
        state.searchedRecipes =
            state.searchedRecipes = recipes.map(recipe => createRecipeObject(recipe));
        // console.log(state.searchedRecipes);
    } catch (err) {
        throw (err);
    }
}
