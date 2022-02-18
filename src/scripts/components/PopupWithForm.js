import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);

        this._submit = submit;
        this.form = this.popup.querySelector('.form');
        this.inputs = this.popup.querySelectorAll('.form__input');

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
        this.form.reset();
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
    }
}
