import {URL, API_URL, WEB_APP_URL} from './Config';
import {ajaxGet} from './Ajax';


class Auth {

    constructor(){}


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
        return localStorage.getItem('right') == 'A'
    }

    static isUserMember(){
        return (localStorage.getItem('right') == 'A' || localStorage.getItem('right') == 'M')
    }


    static async login(){
        this.emptyLocalStorage();

        ajaxGet('auth/me')
            .then(res => {
                Auth.authenticateUser(res.data)
            })
            .catch(error => {
                Auth.goLogin();
            })
    }

    static authenticateUser(data){
        localStorage.setItem('auth', data.authenticated);
        localStorage.setItem('identity', data.identitity);
        localStorage.setItem('right', data.right);

        this.redirectUser();
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
            window.location = '/admin'
        } else {
            window.location = '/'
        } 
    }


    static emptyLocalStorage(){
        localStorage.clear()
    }

}

export default Auth;