import { async } from 'regenerator-runtime'
import * as model from "./model.js"
import recipeView from './views/recipeView.js';
import searchResultsView from './views/searchResultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/PaginationView.js';
import icons from "../img/icons.svg"


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


///////////////////////////// Pagination
// this is the callback function
const controlPagination = function (page = 1) {
  model.state.search.page = page;
  searchResultsView.render(model.getSearchResultsPerPage(page));
  paginationView.renderPagination(model.state.search, controlPagination);

}


const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    searchResultsView.renderSpinner();
    await model.loadSearchResults(query);
    // if (model.state.search.results.length === 0) put it in the render better
    //   throw ('no query found');
    controlPagination(1);

  } catch (err) {
    searchResultsView.displayError();
    console.err(err);
  }
}



// can write in global scope this is better this way
// controlSearchResults();
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);


}
init();
