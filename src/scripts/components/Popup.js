export default class Popup {
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);

        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlay = this._handleOverlay.bind(this);
        this._handleCloseButton = this._handleCloseButton.bind(this);
    }

    /* Открытие */
    open() {
        this.setEvents();
        this.popup.classList.add('popup_open');
    }

    /* Закрытие */
    close() {
        this.removeEvents();
        this.popup.classList.remove('popup_open');
    }

    /* Закрытие по esc */
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    /* Закрытие по оверлею */
    _handleOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    /* Закрытие по крестику */
    _handleCloseButton(evt) {
        const closeButton = this.popup.querySelector('.popup__close-button');

        if (evt.target === closeButton) {
            this.close();
        }
    }

    /* Добавляет слушатель клика иконке закрытия попапа и оверлею */
    setEvents() {
        document.addEventListener('keydown', this._handleEscClose);
        this.popup.addEventListener('click', this._handleOverlay);
        this.popup.addEventListener('click', this._handleCloseButton);
    }

    removeEvents() {
        document.removeEventListener('keydown', this._handleEscClose);
        this.popup.removeEventListener('click', this._handleOverlay);
        this.popup.removeEventListener('click', this._handleCloseButton);
    }
}
