export const URL = "" // URL de l'API
export const API_URL = URL + "/api/"
export const WEB_APP_URL = "" // URL de cette application

export const PUBLIC_URL = process.env.PUBLIC_URL || '';
export function asset_url(path) {
	return PUBLIC_URL + path;
}