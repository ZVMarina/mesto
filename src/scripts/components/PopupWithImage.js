import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
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
