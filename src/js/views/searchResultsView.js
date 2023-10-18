import icons from 'url:../../img/icons.svg'
class SearchResultsView {
    #parentEl = document.querySelector('ul.results');
    #data;
    #errorMessage = 'No recipes found for your query! Please try again ;)'
    #isUserGenerated = false;
    render(data) {
        this.#data = data;
        this.#clear();
        this.#parentEl.insertAdjacentHTML('afterbegin', this.#generateMarkup());
    }
    #clear() {
        this.#parentEl.innerHTML = '';
    }
    #generateMarkup() {
        return this.#data.map(recipe => this.#createrecipePreview(recipe)).join('');
    }
    #createrecipePreview(recipe) {
        return `
        <li class="preview">
            <a class="preview__link preview__link--active" href="#${recipe.id}">
                <figure class="preview__fig">
                    <img src="${recipe.imageUrl}" alt="${recipe.title}" />
                </figure>
                <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                </div>
                ${this.#isUserGenerated ? `
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
    displayError(message = this.#errorMessage) {
        this.#clear();
        const markup = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}.svg#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
        `
        this.#parentEl.insertAdjacentHTML('afterbegin', markup);

    }
}
/* 

*/

export default new SearchResultsView();