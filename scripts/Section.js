export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialCards = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderCards() {
        this._initialCards.forEach(card => {
            this._renderer(card);
        })
    }

    addItem(element) {
        this._container.append(element);
    }
}
