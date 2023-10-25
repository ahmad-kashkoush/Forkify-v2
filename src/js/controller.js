import { async } from 'regenerator-runtime'
import * as model from "./model.js"
import recipeView from './views/recipeView.js';
import searchResultsView from './views/searchResultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/PaginationView.js';
import bookMarkPreview from './views/bookMarkPreview.js';
import uploadRecipeView from './views/uploadRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// api key
//bd8a8c43-7123-4d6c-ae61-dce616b99af4
// show recipe 
//https:forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
// render spinner


const controlRecipe = async function () {

  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // fetching data
    searchResultsView.update(model.getSearchResultsPerPage());
    await model.loadRecipe(id);
    bookMarkPreview.update(model.state.bookmarks);
    // render recipe
    recipeView.render(model.state.recipe)
    // console.log(model.state.recipe);

  } catch (err) {
    recipeView.displayError();
    console.error(err);
  }

}





const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    searchResultsView.renderSpinner();
    await model.loadSearchResults(query);
    // if (model.state.search.results.length === 0) put it in the render better
    //   throw ('no query found');
    searchResultsView.render(model.getSearchResultsPerPage());
    paginationView.render(model.state.search);


  } catch (err) {
    searchResultsView.displayError();
    console.error(err);
  }
}
const controlPagination = function (page) {
  if (page < 1 || page > model.state.search.lastPage)
    return;
  searchResultsView.render(model.getSearchResultsPerPage(page))
  paginationView.render(model.state.search);

}


// can write in global scope this is better this way
// controlSearchResults();
const controlServings = function (numOfServings = 1) {

  if (numOfServings < 1) return;

  model.updateServings(numOfServings);
  recipeView.update(model.state.recipe);
}
const controlBookmarks = function () {
  model.toggleBookmark(model.state.recipe);

  // make it marked in the recipe view
  recipeView.update(model.state.recipe);
  // add recipe preview to bookmarks
  bookMarkPreview.render(model.state.bookmarks);

}
const controlUpload = async function (data) {
  try {
    uploadRecipeView.renderSpinner();

    // console.log(data);
    await model.updateObject(data);
    console.log(model.state.recipe);

    // render it on the page
    recipeView.render(model.state.recipe);
    uploadRecipeView.renderMessage();

    // close form window
    setTimeout(function () {
      uploadRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000)


  } catch (err) {
    console.error('💣💣', err);
    uploadRecipeView.displayError(err.message);
  }

}


const handleBookmarks = function () {
  bookMarkPreview.render(model.state.bookmarks);
}


// controlServings(8)
const init = function () {

  bookMarkPreview.addHandlerRender(handleBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmarks(controlBookmarks);


  // recipeView.addHandlerBookMarks(controlBookMarks);
  searchView.addHandlerSearch(controlSearchResults);

  paginationView.addHandlerClick(controlPagination);

  uploadRecipeView.addHandlerUpload(controlUpload);


}
init();