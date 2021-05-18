export const URL = "https://kraken.picasso-dev.fr/" // URL de l'API
//export const URL = "https://kraken.picasso-utc.fr/" // URL de l'API
export const API_URL = URL + "api/"

export const PUBLIC_URL = process.env.PUBLIC_URL || '';
export function asset_url(path) {
    return PUBLIC_URL + path;
}
