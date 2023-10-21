import icons from 'url:../../img/icons.svg'
import View from './view.js'
class SearchResultsView extends View {

    constructor() {
        super();
        this._parentEl = document.querySelector('ul.results');
        this._data;
        this._errorMessage = 'No recipes found for your query! Please try again ;)'
        this._isUserGenerated = false;
        this._message = '';
    }

    _generateMarkup() {
        return this._data.map(recipe => this.#createrecipePreview(recipe)).join('');
    }
    #createrecipePreview(recipe) {
        const id = window.location.hash.slice(1);
        const selected = recipe.id === id;
        return `
        <li class="preview">
            <a class="preview__link ${selected ? 'preview__link--active' : ''}" href="#${recipe.id}">
                <figure class="preview__fig">
                    <img src="${recipe.imageUrl}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                </div>
                ${this._isUserGenerated ? `
                <div class="preview__user-generated">
                <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                </svg>
            </div>`: ''
            }
            </a>
        </li>
        `
    }
    /* Inherited methods
        render
        renderSpinner
        displayError
        renderMessage
        _clear
 

    */



}
/* 

*/

export default new SearchResultsView();