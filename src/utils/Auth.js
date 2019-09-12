import {URL, asset_url} from './Config';
import {ajaxGet} from './Ajax';

const GENERAL_CONNEXION = 'full';

class Auth {

    static isUserAuthenticated(){
        return localStorage.getItem('auth');
    }

    static getUser(){
        return localStorage.getItem('identity');
    }

    static getUserRight(){
        return localStorage.getItem('right');
    }

    static isUserAdmin(){
        return localStorage.getItem('right') === 'A' && localStorage.getItem('connexion') == GENERAL_CONNEXION
    }

    static isUserMember(){
        return (localStorage.getItem('right') === 'A' || localStorage.getItem('right') === 'M') && localStorage.getItem('connexion') == GENERAL_CONNEXION
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
        localStorage.setItem('identity', data.identitity);
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


    static redirectUser(){
        if (Auth.isUserMember()) {
           // To DO rediriger en fonction des droits
            // et en fonction d'une page d'ou le chargement à débuter 
            window.location = asset_url('/admin')
        } else {
            window.location = asset_url('/')
        } 
    }


    static emptyLocalStorage(){
        localStorage.clear()
    }

}

export default Auth;