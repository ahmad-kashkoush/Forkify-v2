import View from "./view";

class PreviewView extends View {
    _parentEl = '';

    _generateMarkup() {
        const id = window.location.hash.slice(1);
        const selected = this._data.id === id;
        return `
        <li class="preview">
            <a class="preview__link ${selected ? 'preview__link--active' : ''}" href="#${this._data.id}">
                <figure class="preview__fig">
                    <img src="${this._data.imageUrl}" alt="${this._data.title}" />
                </figure>
                <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
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
}
export default new PreviewView();