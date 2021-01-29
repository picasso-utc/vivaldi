export const URL = "https://kraken.picasso-utc.fr" // API's URL
export const API_URL = URL + "/api/"

export const PUBLIC_URL = process.env.PUBLIC_URL || '';
export function asset_url(path) {
    return PUBLIC_URL + path;
}
