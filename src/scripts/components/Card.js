export default class Card {
    constructor(data, myId, templateSelector, handleCardImageClick, api, popupConfirm) {
        this.data = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._myId = myId;
        this._templateSelector = templateSelector;
        this.api = api;
        this.handleCardImageClick = handleCardImageClick;
        this.popupConfirm = popupConfirm;

        this._removeCard = this._removeCard.bind(this);
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
        this._deleteButton = this._element.querySelector('.card__button_type_delete');
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
        
        if (this._ownerId !== this._myId) {
            this._deleteButton.remove()
        }

        if (this._likes.some(item => item._id === this._myId)) {
            this._likeButton.classList.add('card__button_active')
        }

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        /* Like */
        this._likeButton.addEventListener('click', () => {

            if (this._likes.every(item => item._id !== this._myId)) {
                this.api.putLike(this._cardId)
                .then(card => {
                    this._likes = card.likes;
                    this._likeCounter.textContent = this._likes.length;
                    this._toggleActiveLike();
                })
            } else {
                this.api.deleteLike(this._cardId)
                .then(card => {
                    this._likes = card.likes;
                    this._likeCounter.textContent = this._likes.length;
                    this._toggleActiveLike();
                })
            }

        });

        /* Delete card */
        if (this._deleteButton) { 
            this._deleteButton.addEventListener('click', () => {
            this.popupConfirm.open(this._removeCard);
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
        this.api.deleteCard(this._cardId)
        .then(() => {
            this._element.remove();
        })
    }
}
