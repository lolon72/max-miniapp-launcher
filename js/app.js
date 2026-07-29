/**
 * ==========================================================
 * MAX MiniApp Launcher
 * app.js
 * Version: 0.1.0
 * ==========================================================
 */

'use strict';

class App {

    constructor() {

        this.ui = new UI();
        this.maxApi = new MaxApi();

    }

    /**
     * Точка входа
     */
    async start() {

        Logger.startup();

        try {

            await this.maxApi.initialize();

            this.updateEnvironment();

            const user = this.maxApi.getUser();

            if (!user) {

                this.ui.setStatus(
                    CONFIG.TEXT.USER_NOT_FOUND
                );

                this.ui.showError(
                    CONFIG.TEXT.USER_NOT_FOUND
                );

                Logger.warn("User not found.");

                return;

            }

            this.ui.showUser(user);

            this.ui.setStatus(
                this.maxApi.isDebug()
                    ? CONFIG.TEXT.DEBUG_MODE
                    : CONFIG.TEXT.MAX_MODE
            );

            this.ui.enableLaunch(() => {

                this.launch();

            });

            Logger.info("Application is ready.");

        }
        catch (error) {

            Logger.exception(error);

            this.ui.showError(

                error.message ||
                CONFIG.TEXT.UNKNOWN_ERROR

            );

            this.ui.setStatus(

                CONFIG.TEXT.UNKNOWN_ERROR

            );

        }

    }

    /**
     * Открытие второго приложения
     */
    launch() {

        try {

            Logger.info("Launching target application...");

            this.maxApi.launch();

        }
        catch (error) {

            Logger.exception(error);

            this.ui.showError(

                "Не удалось открыть приложение."

            );

        }

    }

    /**
     * Отображение среды
     */
    updateEnvironment() {

        if (this.maxApi.isDebug()) {

            this.ui.setDebugMode();

        }
        else {

            this.ui.setMaxMode();

        }

    }

}

/**
 * ==========================================================
 * Bootstrap
 * ==========================================================
 */

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        const app = new App();

        await app.start();

    }

);
