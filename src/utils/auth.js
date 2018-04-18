import config from '../config';

export function redirectLogin() {
    localStorage.clear();
    window.location.href = config.loginURL + window.location.origin;
}