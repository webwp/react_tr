import config from '../config';

export function redirectLogin() {
    //console.log()
    localStorage.clear();
    window.location.href = config.loginURL;
}