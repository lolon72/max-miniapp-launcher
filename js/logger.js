/**
 * ==========================================================
 * MAX MiniApp Launcher
 * logger.js
 * Version: 0.1.0
 * ==========================================================
 */

'use strict';

class Logger {

    static LEVELS = Object.freeze({
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        NONE: 99
    });

    static currentLevel = Logger.#resolveLevel();

    static #resolveLevel() {

        if (!CONFIG || !CONFIG.LOG_LEVEL) {
            return Logger.LEVELS.INFO;
        }

        switch (String(CONFIG.LOG_LEVEL).toLowerCase()) {

            case 'debug':
                return Logger.LEVELS.DEBUG;

            case 'info':
                return Logger.LEVELS.INFO;

            case 'warn':
                return Logger.LEVELS.WARN;

            case 'error':
                return Logger.LEVELS.ERROR;

            case 'none':
                return Logger.LEVELS.NONE;

            default:
                return Logger.LEVELS.INFO;
        }
    }

    static #time() {

        return new Date().toLocaleTimeString(
            'ru-RU',
            {
                hour12: false
            }
        );

    }

    static #prefix(level) {

        return `[${Logger.#time()}] [${level}]`;

    }

    static #allow(level) {

        return level >= Logger.currentLevel;

    }

    static debug(...args) {

        if (!Logger.#allow(Logger.LEVELS.DEBUG)) {
            return;
        }

        console.debug(
            Logger.#prefix('DEBUG'),
            ...args
        );

    }

    static info(...args) {

        if (!Logger.#allow(Logger.LEVELS.INFO)) {
            return;
        }

        console.info(
            Logger.#prefix('INFO'),
            ...args
        );

    }

    static warn(...args) {

        if (!Logger.#allow(Logger.LEVELS.WARN)) {
            return;
        }

        console.warn(
            Logger.#prefix('WARN'),
            ...args
        );

    }

    static error(...args) {

        if (!Logger.#allow(Logger.LEVELS.ERROR)) {
            return;
        }

        console.error(
            Logger.#prefix('ERROR'),
            ...args
        );

    }

    static group(title) {

        if (Logger.currentLevel > Logger.LEVELS.DEBUG) {
            return;
        }

        console.group(title);

    }

    static groupEnd() {

        if (Logger.currentLevel > Logger.LEVELS.DEBUG) {
            return;
        }

        console.groupEnd();

    }

    static table(data) {

        if (!Logger.#allow(Logger.LEVELS.DEBUG)) {
            return;
        }

        console.table(data);

    }

    static exception(error) {

        if (!error) {

            Logger.error("Unknown exception");

            return;

        }

        Logger.group("Exception");

        Logger.error(error.message);

        if (error.stack) {

            console.error(error.stack);

        }

        Logger.groupEnd();

    }

    static startup() {

        Logger.info(
            `${CONFIG.APP.NAME} v${CONFIG.APP.VERSION}`
        );

        if (CONFIG.DEBUG) {

            Logger.info(
                "Application started in DEBUG mode."
            );

        } else {

            Logger.info(
                "Application started."
            );

        }

    }

}
