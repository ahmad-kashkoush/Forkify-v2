export const state = {
    recipe: {},

}
export const loadRecipe = async function (id) {
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await response.json();
        if (!response.ok)
            throw new Error(`${data.message} (${response.status})`)


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
        alert(err);
    }
}
