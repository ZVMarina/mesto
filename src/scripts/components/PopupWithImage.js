import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this.image = this.popup.querySelector('.popup__image');
        this.title = this.popup.querySelector('.popup__image-title');
    }

    /* Открыть и вставить в попап картинку с src и подписью */
    open(link, name) {
        this.image.src = link;
        this.image.alt = name;
        this.title.textContent = name;

        super.open();
    }
}
