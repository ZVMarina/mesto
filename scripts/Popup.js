class Popup {
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

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    /* Открыть и вставить в попап картинку с src и подписью */
    open(link, name) {
        const image = this.popup.querySelector('.popup__image');
        const title = this.popup.querySelector('.popup__image-title');

        image.src = link;
        image.alt = name;
        title.textContent = name;

        super.open();
    }
}

class PopupWithForm extends Popup {
    constructor(popupSelector, submit, handleClearInputsErrors) {
        super(popupSelector);

        this._submit = submit;
        this.form = this.popup.querySelector('.form');
        this.inputs = this.popup.querySelectorAll('.form__input');
        this.handleClearInputsErrors = handleClearInputsErrors;

        this._onSubmit = this._onSubmit.bind(this);
    }

    /* Получить значения инпутов */
    _getInputValues() {
        this._formValues = {};
        this.inputs.forEach(input => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    _clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    _onSubmit(evt) {
        const values = this._getInputValues();

        this._submit(evt, values);
        this.close();
    }

    /* Добавляет слушатель клика иконке закрытия попапа и оверлею; добавляет обработчик сабмита формы */
    setEvents() {
        super.setEvents();

        this.form.addEventListener('submit', this._onSubmit);
    }

    removeEvents() {
        super.removeEvents();

        this.form.removeEventListener('submit', this._onSubmit);
    }

    /* Закрыть и очистить поля */
    close() {
        super.close();

        this._clearInputs();
        this.handleClearInputsErrors();
    }
}

export { PopupWithImage, PopupWithForm }
