export default class UserInfo {
    constructor({ nameSelector, infoSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.infoElement = document.querySelector(infoSelector);
    }

    getUserInfo() {
        this.information = {};
        this.information.name = this.nameElement.textContent;
        this.information.info = this.infoElement.textContent;
        return this.information;
    }

    setUserInfo(newName, newInfo) {
        this.nameElement.textContent = newName;
        this.infoElement.textContent = newInfo;
    }
}
