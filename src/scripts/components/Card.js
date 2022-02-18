export default class Card {
    constructor(data, templateSelector, handleCardImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this.handleCardImageClick = handleCardImageClick;
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
        this._likeButton = this._element.querySelector('.card__button_type_like');
        this._likeCounter = this._element.querySelector('.card__like-counter');
        this._cardImage = this._element.querySelector('.card__image');
        this._cardTitle = this._element.querySelector('.card__title');
        this._deleteButton = this._element.querySelector('.card__button_type_delete');
        this._setEventListeners();

        /* Image */
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        /* Title */
        this._cardTitle.textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        /* Like */
        this._likeButton.addEventListener('click', () => {
            this._toggleActiveLike();
        });

        /* Delete card */
        this._deleteButton.addEventListener('click', () => {
            this._removeCard();
        });

        /* Open card */
        this._cardImage.addEventListener('click', () => {
            this.handleCardImageClick(this._link, this._name);
        });
    }

    _toggleActiveLike() {
        this._likeButton.classList.toggle('card__button_active');
    }

    _removeCard() {
        this._element.remove();
    }
}
