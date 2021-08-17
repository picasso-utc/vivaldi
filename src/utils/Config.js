const prod = {
    urls: {
        URL:'https://kraken.picasso-utc.fr/', // URL de l'API
        API_URL:'https://kraken.picasso-utc.fr/api/' // URL de l'API
    }
}

const dev = {
    urls: {
        URL:'https://kraken.picasso-dev.fr/', // URL de l'API
        API_URL:'https://kraken.picasso-dev.fr/api/' // URL de l'API
    }
}

const local = {
    urls: {
        URL:'http:localhost:8081/', // URL de l'API
        API_URL:'http:localhost:8081/api/' // URL de l'API
    }
}

export const PUBLIC_URL = process.env.PUBLIC_URL || '';
export function asset_url(path) {
    return PUBLIC_URL + path;
}


export const config = process.env.REACT_APP_KRAKEN === 'prod' ? prod : process.env.REACT_APP_KRAKEN === 'dev' ? dev : local;
