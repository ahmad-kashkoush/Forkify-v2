import { async } from 'regenerator-runtime'
import * as model from "./model.js"
import recipeView from './views/recipeView.js';
import searchResultsView from './views/searchResultsView.js';
import searchView from './views/searchView.js';



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// api key
//bd8a8c43-7123-4d6c-ae61-dce616b99af4
// show recipe 
//https:forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
// render spinner


const apiKey = `bd8a8c43-7123-4d6c-ae61-dce616b99af4`;
const controlRecipe = async function () {

  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // fetching data
    await model.loadRecipe(id);
    // render recipe
    recipeView.render(model.state.recipe)

  } catch (err) {
    recipeView.displayError();
  }

}

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    searchResultsView.renderSpinner();
    await model.loadSearchResults(query);
    // if (model.state.searchedRecipes.length === 0) put it in the render better
    //   throw ('no query found');
    searchResultsView.render(model.state.searchedRecipes);//
    console.log(model.state.searchedRecipes);
  } catch (err) {
    searchResultsView.displayError();

  }
}
// can write in global scope this is better this way
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}
init();