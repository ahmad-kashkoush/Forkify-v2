import View from "./view.js";
import icons from "url:../../img/icons.svg"

class UploadRecipeView extends View {
    constructor() {
        super();
        this._parentEl = document.querySelector('.upload');
        this._window = document.querySelector('.add-recipe-window');
        this._overlay = document.querySelector('.overlay');
        this._btnOpen = document.querySelector('.nav__btn--add-recipe');
        this._btnClose = document.querySelector('.btn--close-modal');
        this._message = 'Recipe is successfully uploaded :)';
        this._addHandlerShow();
        this._addHandlerClose();

    }
    toggleWindow() {
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }
    _addHandlerShow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }
    _addHandlerClose() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));

    }
    addHandlerUpload(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            const data = Object.fromEntries([...new FormData(this)]);
            handler(data);
        })
    }
}
export default new UploadRecipeView();