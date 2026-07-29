class App {

    constructor() {

        this.api = new MaxApi();
        this.ui = new UI();

    }

    async start() {

        this.ui.setVersion(CONFIG.VERSION);

        this.ui.setStatus("Ожидание подключения MAX...");

    }

}

window.addEventListener("DOMContentLoaded", async () => {

    const app = new App();

    await app.start();

});
