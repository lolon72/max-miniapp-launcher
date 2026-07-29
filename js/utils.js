/**
 * ==========================================================
 * MAX MiniApp Launcher
 * utils.js
 * Version: 0.1.0
 * ==========================================================
 */

'use strict';

class Utils {

    /**
     * Задержка выполнения
     * @param {number} ms
     * @returns {Promise<void>}
     */
    static sleep(ms = 0) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Проверка, что значение является объектом
     * @param {*} value
     * @returns {boolean}
     */
    static isObject(value) {
        return value !== null &&
            typeof value === 'object' &&
            !Array.isArray(value);
    }

    /**
     * Проверка строки
     * @param {*} value
     * @returns {boolean}
     */
    static isString(value) {
        return typeof value === 'string';
    }

    /**
     * Проверка числа
     * @param {*} value
     * @returns {boolean}
     */
    static isNumber(value) {
        return Number.isFinite(value);
    }

    /**
     * Проверка функции
     * @param {*} value
     * @returns {boolean}
     */
    static isFunction(value) {
        return typeof value === 'function';
    }

    /**
     * Экранирование HTML
     * @param {string} value
     * @returns {string}
     */
    static escapeHtml(value = '') {

        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');

    }

    /**
     * Получение инициалов пользователя
     * @param {Object} user
     * @returns {string}
     */
    static getInitials(user) {

        if (!user) {
            return '?';
        }

        const first = user.first_name?.trim()?.charAt(0) ?? '';
        const last = user.last_name?.trim()?.charAt(0) ?? '';

        const initials = `${first}${last}`.toUpperCase();

        return initials || '?';

    }

    /**
     * Полное имя пользователя
     * @param {Object} user
     * @returns {string}
     */
    static getFullName(user) {

        if (!user) {
            return 'Неизвестный пользователь';
        }

        return [
            user.first_name,
            user.last_name
        ]
            .filter(Boolean)
            .join(' ')
            .trim();

    }

    /**
     * Формирование URL с query-параметрами
     * @param {string} baseUrl
     * @param {Object} params
     * @returns {string}
     */
    static createUrl(baseUrl, params = {}) {

        const url = new URL(baseUrl);

        Object.entries(params).forEach(([key, value]) => {

            if (value === undefined || value === null) {
                return;
            }

            url.searchParams.set(key, value);

        });

        return url.toString();

    }

    /**
     * Получение query-параметра
     * @param {string} name
     * @returns {string|null}
     */
    static getQueryParam(name) {

        const params = new URLSearchParams(window.location.search);

        return params.get(name);

    }

    /**
     * Безопасное преобразование к строке
     * @param {*} value
     * @returns {string}
     */
    static toString(value) {

        if (value === null || value === undefined) {
            return '';
        }

        return String(value);

    }

    /**
     * Безопасное выполнение функции
     * @param {Function} callback
     * @param {*} fallback
     * @returns {*}
     */
    static safe(callback, fallback = null) {

        try {

            return callback();

        } catch (error) {

            Logger.exception(error);

            return fallback;

        }

    }

    /**
     * Проверка доступности MAX Bridge
     * @returns {boolean}
     */
    static hasMaxBridge() {

        return typeof window !== 'undefined'
            && typeof window.WebApp !== 'undefined';

    }

    /**
     * Генерация случайного идентификатора
     * @returns {string}
     */
    static uuid() {

        if (window.crypto?.randomUUID) {
            return crypto.randomUUID();
        }

        return `id-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 10)}`;

    }

    /**
     * Копирование текста в буфер обмена
     * @param {string} text
     * @returns {Promise<boolean>}
     */
    static async copyToClipboard(text) {

        try {

            await navigator.clipboard.writeText(text);

            return true;

        } catch {

            return false;

        }

    }

}
