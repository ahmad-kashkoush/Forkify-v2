import View from "./view.js";
import icons from "url:../../img/icons.svg"

class PaiginationView extends View {
    constructor() {
        super();
        this._parentEl = document.querySelector('.pagination');

    }
    _generateMarkup() {

        const page = this._data.page;
        const markup = `
            ${page - 1 >= 1 ? `
            <button data-go-to="${page - 1}" class="btn--inline pagination__btn--prev" >
                <svg class="search__icon">
                     <use href="${icons}.svg#icon-arrow-left"></use>
                </svg>
            <span>Page ${page - 1}</span>
            </button > `
                : ''}
            ${page + 1 <= this._data.lastPage ?
                `
            <button data-go-to="${page + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${page + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}.svg#icon-arrow-right"></use>
                </svg>
            </button>
            
            `: ''}
            `;
        return markup;
    }

    addHandlerClick(handler) {
        // used event Delegation
        this._parentEl.addEventListener('click', function (e) {
            e.preventDefault();
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goTo = +btn.dataset.goTo;

            handler(goTo)


        }.bind(this));
    }

}
export default new PaiginationView();