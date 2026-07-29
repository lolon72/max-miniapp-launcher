class MaxApi {

    async initialize() {
        return true;
    }

    isAvailable() {
        return false;
    }

    getUser() {
        return null;
    }

    openLink(url) {
        window.open(url, "_blank");
    }

}
