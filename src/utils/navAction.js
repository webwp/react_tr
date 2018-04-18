export function authNav (url, history) {

}

export function navBack (url, history) {
	if (history.action == 'PUSH') {
		history.goBack();
	} else {
		history.replace(url);
	}
}