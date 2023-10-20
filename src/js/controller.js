import { async } from 'regenerator-runtime'
import * as model from "./model.js"
import recipeView from './views/recipeView.js';
import searchResultsView from './views/searchResultsView.js';
import searchView from './views/searchView.js';
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
const renderPagination = function (page = 6) {
  // parent
  const paginationElement = document.querySelector('.pagination');

  paginationElement.innerHTML = '';
  //  generate Markup
  const markup = `
  ${page - 1 >= 1 ? `
  <button button class="btn--inline pagination__btn--prev" >
  <svg class="search__icon">
  <use href="${icons}.svg#icon-arrow-left"></use>
  </svg>
  <span>Page ${page - 1}</span>
  </button > `
      : ''}
  ${page + 1 <= model.state.search.lastPage ?
      `
  <button class="btn--inline pagination__btn--next">
  <span>Page ${page + 1}</span>
  <svg class="search__icon">
  <use href="${icons}.svg#icon-arrow-right"></use>
  </svg>
  </button>
  
  `: ''}
  `;
  // console.log(markup);
  //handler render
  paginationElement.insertAdjacentHTML('beforeend', markup);
  if (page + 1 <= model.state.search.lastPage) {
    document.querySelector('.pagination__btn--next').addEventListener('click', function (e) {
      e.preventDefault();
      goToPage(model.state.search.page + 1);
    })
  }
  if (page - 1 >= 1) {
    document.querySelector('.pagination__btn--prev').addEventListener('click', function (e) {
      e.preventDefault();
      goToPage(model.state.search.page - 1);
    })
  }

  console.log(paginationElement);
}
// this is the callback function
const goToPage = function (page = 1) {
  model.state.search.page = page;
  console.log(model.getSearchResultsPerPage(page));
  searchResultsView.render(model.getSearchResultsPerPage(page));
  renderPagination(page);
}


const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    searchResultsView.renderSpinner();
    await model.loadSearchResults(query);
    // if (model.state.search.results.length === 0) put it in the render better
    //   throw ('no query found');
    goToPage();

  } catch (err) {
    searchResultsView.displayError();
    console.log(err);
  }
}



// can write in global scope this is better this way
// controlSearchResults();
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);


}
init();
