import View from "./view.js";
import icons from "url:../../img/icons.svg"

class ResultPaiginationView extends View {
    constructor() {
        super();
        this._parentEl = document.querySelector('.pagination');

    }
    renderPagination(data, handler) {
        this.render(data);
        this.addHandlerRender(handler);
    }
    _generateMarkup() {
        const page = this._data.page;
        // console.log(this._data);
        const markup = `
            ${page - 1 >= 1 ? `
            <button button class="btn--inline pagination__btn--prev" >
                <svg class="search__icon">
                     <use href="${icons}.svg#icon-arrow-left"></use>
                </svg>
            <span>Page ${page - 1}</span>
            </button > `
                : ''}
            ${page + 1 <= this._data.lastPage ?
                `
            <button class="btn--inline pagination__btn--next">
                <span>Page ${page + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}.svg#icon-arrow-right"></use>
                </svg>
            </button>
            
            `: ''}
            `;
        return markup;
    }

    addHandlerRender(handler) {

        if (this._data.page + 1 <= this._data.lastPage) {
            this._parentEl.querySelector('.pagination__btn--next').addEventListener('click', function (e) {
                e.preventDefault();
                handler(this._data.page + 1);
            }.bind(this))
        }
        if (this._data.page - 1 >= 1) {
            this._parentEl.querySelector('.pagination__btn--prev').addEventListener('click', function (e) {
                e.preventDefault();
                handler(this._data.page - 1);
            }.bind(this))
        }
    }

}
export default new ResultPaiginationView();