import View from "./view";
import previewView from "./previewView.js";


class BookmarkPreview extends View {
    constructor() {
        super();
        this._parentEl = document.querySelector('.bookmarks');
        this._errorMessage = 'No bookmarks yet, find good recipe and bookmark it  :)'
    }
    //Will refactor this part by making a parent Element
    _generateMarkup() {
        return this._data.map(recipe => previewView.render(recipe, false)).join('');
    }



}




export default new BookmarkPreview();