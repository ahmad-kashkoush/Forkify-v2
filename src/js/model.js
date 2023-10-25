import { API_URL, RESULTS_PER_PAGE, API_KEY } from './config.js'
import { AJAX } from './helpers.js'
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
const createRecipeObject = function (recipe, isUserGenerated) {
    return {
        title: recipe.title,
        id: recipe.id,
        imageUrl: recipe.image_url,
        sourceUrl: recipe.source_url,
        publisher: recipe.publisher,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        userGenerated: isUserGenerated,
        ...(recipe.key && ({ key: recipe.key })),
    }
}

export const loadRecipe = async function (id) {
    try {

        const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);
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
        const data = await AJAX(`${API_URL}?search=${foodName}&key=${API_KEY}`);

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

// update object coming from submit

export const updateObject = async function (newRecipe) {
    try {

        const ingredients = Object.entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] != '')
            .map(ing => {
                const ingArr = ing[1].replaceAll(' ', '').split(',');
                if (ingArr.length !== 3)
                    throw new Error(
                        'Wrong ingredient format! Please use the correct format :)'
                    );

                const [quantity, unit, description] = ingArr;
                return { quantity: quantity ? +quantity : null, unit, description };
            });
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        };
        const response = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
        const data = response.data.recipe;
        state.recipe = createRecipeObject(data, true);// data, userGenerated
        toggleBookmark(state.recipe);
    } catch (err) {
        throw (err);
    }

}


const storeBookmarks = function () {
    localStorage.setItem('Bookmarks', JSON.stringify(state.bookmarks))
}
const init = function () {
    const storage = localStorage.getItem('Bookmarks');

    if (storage) state.bookmarks = JSON.parse(storage);
    // console.log(state.bookmarks);

}
init();