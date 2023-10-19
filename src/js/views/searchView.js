class searchView {
    // text field
    // button and some events
    #searchField = document.querySelector('.search__field');
    #parentEl = document.querySelector('.search')
    getQuery() {
        const value = this.#searchField.value;
        this.#clear();
        return value;
    }
    #clear() {
        this.#searchField.value = '';
    }
    addHandlerSearch(handler) {
        this.#parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        })
    }
}

export default new searchView();

/*
 * I want that When I Fire up an event
 * text be returned from searchView and load search on it
 Todo:

    [] have a subscriber (control search Results)
    [] 
 */