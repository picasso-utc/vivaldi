import {URL, API_URL} from './Config';
import {ajaxGet} from './Ajax';
import axios from 'axios';



class Auth {

    constructor(){}


    static isUserAuthenticated(){
        return localStorage.getItem('auth');
    }

    static getUser(){
        return localStorage.getItem('identity');
    }

    static getUserRight(){
        return localStorage.getItem('rights');
    }

    static isUserAdmin(){
        return localStorage.getItem('rights') == 'A'
    }


    static async login(){

        axios.get(API_URL + 'auth/me', {withCredentials: true})
            .then(function(res){
                Auth.authenticateUser(res.data)
            })
            .catch(function(error){
                Auth.goLogin();
            })
    }

    static authenticateUser(data){
        localStorage.setItem('auth', data.authenticated);
        localStorage.setItem('identity', data.identitity);
        localStorage.setItem('rights', data.rights);

        this.redirectUser();
    }


    static goLogin(){
        const current_url = window.location.href;
        // Redirection vers le CAS 
        window.location.href = URL + '/api/auth/login?redirect=' + current_url;
    }

    static redirectUser(){
        if (Auth.isUserAuthenticated()) {
           // To DO rediriger en fonction des droits
            // et en fonction d'une page d'ou le chargement à débuter 
            window.location.href = URL + '/admin' 
        }
        
    }
}

export default Auth;