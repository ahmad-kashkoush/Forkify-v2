import icons from "url:../../img/icons.svg"
export default class View {
    _parentEl;
    _data;
    _errorMessage;
    _message;
    _isUserGenerated;
    render(data) {
        // handle empty data
        if (!data || (Array.isArray(data) && data.length === 0)) return this.displayError();
        this._data = data;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', this._generateMarkup());//in child class
    }
    // ToDO
    update(data) {
        const newMarkup = this._generateMarkup();

        const newDom = [...document.createRange().createContextualFragment(newMarkup).querySelectorAll('*')];
        const curDom = [...this._parentEl.querySelectorAll('*')];
        // console.log(newDom);
        newDom.forEach((newEl, i) => {
            const curEl = curDom[i];
            // update text;
            if (!newEl.isEqualNode(curEl) && newEl.firstChild.nodeValue.trim() !== '')
                curEl.firstChild.nodeValue = newEl.firstChild.nodeValue;
            if (!newEl.isEqualNode(curEl)) {
                [...newEl.attributes].forEach(attr => {
                    curEl.setAttribute(attr.name, attr.value);
                })
            }
        })

    }
    _clear() {
        this._parentEl.innerHTML = '';
    }
    displayError(message = this._errorMessage) {
        this._clear();
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
        this._parentEl.insertAdjacentHTML('afterbegin', markup);
    }
    renderMessage(message = this._message) {
        this._clear();
        const markup = `
        <div class="message">
            <div>
            <svg>
                <use href="${icons}.svg#icon-smile"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
        `
        this._parentEl.insertAdjacentHTML('afterbegin', markup);

    }

    // Render Spinner
    renderSpinner = function () {
        const html = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
          </div>`
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', html);
    }

}
