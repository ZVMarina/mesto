class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);

        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlay = this._handleOverlay.bind(this);
    }

    /* Открытие */
    open() {
        this.setEvents();
        this._popup.classList.add('popup_open');
    }

    /* Закрытие */
    close() {
        this.removeEvents();
        this._popup.classList.remove('popup_open');
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

    /* Добавляет слушатель клика иконке закрытия попапа и оверлею */
    setEvents() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleOverlay);
    }

    removeEvents() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._handleOverlay);
    }
}

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    /* Открыть и вставить в попап картинку с src и подписью */
    open(link, name) {
        const image = this._popup.querySelector('.popup__image');
        const title = this._popup.querySelector('.popup__image-title');

        image.src = link;
        image.alt = name;
        title.textContent = name;

        super.open();
    }
}

class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
    }

    /* Получить значения инпутов */
    _getInputValues() {

    }

    /* Добавляет слушатель клика иконке закрытия попапа и оверлею; добавляет обработчик сабмита формы */
    setEventListeners() {

    }

    /* Закрыть и очистить поля */
    close() {

    }
}

export { PopupWithImage, PopupWithForm }
