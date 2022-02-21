export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.infoElement = document.querySelector(infoSelector);
        this.avatarElement = document.querySelector(avatarSelector);
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

    setAvatar(link) {
        this.avatarElement.src = link;
    }
}
