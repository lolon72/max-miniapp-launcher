class UI {

    setStatus(text) {
        document.getElementById("status").textContent = text;
    }

    showUser(user) {

        document.getElementById("userCard")
            .classList.remove("hidden");

        document.getElementById("userName")
            .textContent = user.name;

        document.getElementById("userId")
            .textContent = "ID: " + user.id;
    }

    setVersion(version) {
        document.getElementById("version").textContent =
            "Версия " + version;
    }

}
