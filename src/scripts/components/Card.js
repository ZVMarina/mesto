export default class Card {
    constructor(data, templateSelector, handleCardImageClick, handleCardConfirm) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._myId = data._myId;
        this._templateSelector = templateSelector;
        this.handleCardImageClick = handleCardImageClick;
        this.handleCardConfirm = handleCardConfirm;
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

        /* Image */
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        /* Title */
        this._cardTitle.textContent = this._name;

        /* Like-counter */
        this._likeCounter.textContent = this._likes.length;
        
        if (this._ownerId === this._myId) {
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'card__button card__button_type_delete');
            deleteButton.setAttribute('type', 'button');
            deleteButton.setAttribute('aria-label', 'Удалить карточку');
            this._element.append(deleteButton);
            this._deleteButton = this._element.querySelector('.card__button_type_delete');
        }

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        /* Like */
        this._likeButton.addEventListener('click', () => {
            this._toggleActiveLike();
        });

        /* Delete card */
        if (this._deleteButton) { 
            this._deleteButton.addEventListener('click', () => {
            this.handleCardConfirm();
            /* this._removeCard(); */
        })};

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
