import {URL, asset_url} from './Config';
import {ajaxGet, ajaxPost} from './Ajax';

const GENERAL_CONNEXION = 'full';

class Auth {

    static isUserAuthenticated(){
        return localStorage.getItem('auth');
    }

    static getUserInformation(){
        const identity = {
            login : localStorage.getItem('login'),
            last_name : localStorage.getItem('last_name'),
            first_name : localStorage.getItem('first_name'),
            email : localStorage.getItem('email')
        } 
        return identity;
    }

    static getUserRight(){
        return localStorage.getItem('right');
    }

    static isUserAdmin(){
        return localStorage.getItem('right') === 'A' && localStorage.getItem('connexion') === GENERAL_CONNEXION
    }

    static isUserMember(){
        return (localStorage.getItem('right') === 'A' || localStorage.getItem('right') === 'M') && localStorage.getItem('connexion') === GENERAL_CONNEXION
    }

    static isConnexionRestricted(){
        return localStorage.getItem('connexion') !== GENERAL_CONNEXION;
    }


    static async login(){
        this.emptyLocalStorage();

        this.checkAuth()
            .then(res => {
                Auth.authenticateUser(res.data)
                if (Auth.isConnexionRestricted()) {
                    Auth.goLogin();
                } else {
                    Auth.redirectUser();
                }
            })
            .catch(error => {
                Auth.goLogin();
            })
    }

    static async checkAuth(){
        return ajaxGet('auth/me');
    }

    static authenticateUser(data){
        localStorage.setItem('auth', data.authenticated);
        localStorage.setItem('login', data.user.login);
        localStorage.setItem('last_name', data.user.nom);
        localStorage.setItem('first_name', data.user.prenom);
        localStorage.setItem('email', data.user.mail);
        localStorage.setItem('right', data.right);
        localStorage.setItem('connexion', data.connexion);
    }


    static goLogin(){
        const current_url = window.location.href;
        // Redirection vers le CAS 
        window.location.href = URL + '/api/auth/login?redirect=' + current_url;
    }


    static goLogout(){
        this.emptyLocalStorage();
        window.location.href = URL + '/api/auth/logout';
    }


    static loginUsername(data){
        return ajaxPost('auth/username', data);
    }


    static redirectUser(){
        const query = new URLSearchParams(window.location.search);
        const redirect = query.get('redirect')
        if (redirect) {
            if (!Auth.isUserMember() && redirect.startsWith('/admin')) {
                window.location = asset_url('/');
            } else {
                window.location = redirect;
            }
        } else {
            if (Auth.isUserMember()) {
                window.location = asset_url('/admin');
            } else {
                window.location = asset_url('/');
            } 
        }
    }


    static emptyLocalStorage(){
        localStorage.clear()
    }

}

export default Auth;