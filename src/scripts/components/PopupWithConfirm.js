import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, submit) {
        super(popupSelector);

        this._submit = submit;
    }
}