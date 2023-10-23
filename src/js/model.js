import { API_URL, RESULTS_PER_PAGE } from './config.js'
import { getJson } from './helpers.js'
export const state = {
    recipe: {},
    search: {
        resultsPerPage: RESULTS_PER_PAGE,
        results: [],
        page: 1,
        lastPage: 0,
    },
    bookmarks: [],



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
        // console.log(recipe);
        state.recipe = createRecipeObject(recipe);


        state.recipe.bookmarked = state.bookmarks.some(recipe => recipe.id === id);


        // console.log(state.recipe);

    } catch (err) {
        throw (err);
    }
}

export const loadSearchResults = async function (foodName) {
    try {
        const data = await getJson(`${API_URL}?search=${foodName}`);

        const { recipes } = data.data;

        state.search.results = recipes.map(recipe => recipe = createRecipeObject(recipe));

        // lastPage
        state.search.lastPage = Math.ceil(state.search.results.length / state.search.resultsPerPage);
        state.search.page = 1;
        console.log(state.search.results);
    } catch (err) {
        throw (err);
    }
}

export const getSearchResultsPerPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = Math.min(page * state.search.resultsPerPage, state.search.results.length);


    // console.log(state.search.results.slice(start, end));
    return state.search.results.slice(start, end);

}
export const updateServings = function (newServings = state.recipe.servings) {
    state.recipe.ingredients = state.recipe.ingredients.map(ingredient => {
        ingredient.quantity = newServings * ingredient.quantity / state.recipe.servings;
        return ingredient;
    });
    state.recipe.servings = newServings;
}


export const toggleBookmark = function (recipe) {
    // addBookmark;
    console.log(recipe);
    // mark it in the recipe view
    if (recipe.id !== state.recipe.id) return;
    if (!state.recipe.bookmarked) {
        state.recipe.bookmarked = true;
        state.bookmarks.push(recipe);
    }
    else {
        state.recipe.bookmarked = false;
        state.bookmarks.splice(state.bookmarks.indexOf(recipe), 1);
    }

    storeBookmarks();
}
// localStorage bookmarks

const storeBookmarks = function () {
    localStorage.setItem('Bookmarks', JSON.stringify(state.bookmarks))
}
const init = function () {
    const storage = localStorage.getItem('Bookmarks');

    if (storage) state.bookmarks = JSON.parse(storage);
    // console.log(state.bookmarks);

}
init();