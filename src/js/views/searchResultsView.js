import icons from 'url:../../img/icons.svg'
import View from './view.js'
import previewView from './previewView.js';
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
        return this._data.map(recipe => previewView.render(recipe, false)).join('');
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