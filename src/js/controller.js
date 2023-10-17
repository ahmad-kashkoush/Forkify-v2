'use strict'
const recipeContainer = document.querySelector('.recipe');

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

const apiKey = `bd8a8c43-7123-4d6c-ae61-dce616b99af4`;
const showRecipe = async function () {
  try {
    // fetching data
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);
    const data = await response.json();
    if (!response.ok)
      throw new Error(`${data.message} (${response.status})`)


    // updating recipe object
    let { recipe } = data.data;
    recipe = {
      title: recipe.id,
      id: recipe.id,
      imageUrl: recipe.image_url,
      sourceUrl: recipe.source_url,
      publisher: recipe.publisher,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }
    console.log(recipe);

  } catch (err) {
    alert(err);
  }

}
showRecipe();
