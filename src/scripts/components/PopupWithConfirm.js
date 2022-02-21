import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._submitButton = this.popup.querySelector('.form__main-button_place_confirm');

        this._onSubmit = this._onSubmit.bind(this);
    }

    open(submit) {
        super.open();

        this._submit = submit;
    }

    setEvents() {
        super.setEvents();

        this._submitButton.addEventListener('click', this._onSubmit);
    }

    removeEvents() {
        super.removeEvents();

        this._submitButton.removeEventListener('click', this._onSubmit);
    }

    _onSubmit() {
        this._submit();
        super.close();
    }
}