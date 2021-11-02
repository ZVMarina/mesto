export default class Card {
    constructor(data, templateSelector, handleCardImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardImageClick = handleCardImageClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        /* Image */
        const cardImage = this._element.querySelector('.card__image');
        cardImage.src = this._link;
        cardImage.alt = this._name;

        /* Title */
        this._element.querySelector('.card__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        /* Like */
        this._element.querySelector('.card__button_type_like').addEventListener('click', () => {
            this._toggleActiveLike();
        });

        /* Delete card */
        this._element.querySelector('.card__button_type_delete').addEventListener('click', () => {
            this._removeCard();
        });

        /* Open card */
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardImageClick(this._link, this._name);
        });
    }

    _toggleActiveLike() {
        this._element.querySelector('.card__button_type_like').classList.toggle('card__button_active');
    }

    _removeCard() {
        this._element.remove();
    }
}
