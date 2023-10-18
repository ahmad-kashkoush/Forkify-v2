
import * as model from "./model.js"
import recipeView from './views/recipeView.js';


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// api key
//bd8a8c43-7123-4d6c-ae61-dce616b99af4
// show recipe 
//https:forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
// render spinner


const apiKey = `bd8a8c43-7123-4d6c-ae61-dce616b99af4`;
const showRecipe = async function () {

  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // fetching data
    await model.loadRecipe(id);
    // render recipe
    recipeView.render(model.state.recipe)

  } catch (err) {
    alert(err);
  }

}
// load recipe when window loads, or changed it's hash
const events = ['hashchange', 'load'];
events.forEach(event => {
  window.addEventListener(event, showRecipe)
})

