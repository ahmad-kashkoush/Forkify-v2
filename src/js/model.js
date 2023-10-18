import { API_URL } from './config.js'
import { getJson } from './helpers.js'
export const state = {
    recipe: {},

}
export const loadRecipe = async function (id) {
    try {

        const data = await getJson(`${API_URL}/${id}`);
        // updating recipe object
        const { recipe } = data.data;
        state.recipe = {
            title: recipe.title,
            id: recipe.id,
            imageUrl: recipe.image_url,
            sourceUrl: recipe.source_url,
            publisher: recipe.publisher,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }
        console.log(state.recipe);

    } catch (err) {
        throw (err);
    }
}
