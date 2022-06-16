import { authenticationResponse, claim } from "./auth.model";

const tokenKey = 'token';
const expirationKey = 'token-expiration';

export function saveToken(authData: authenticationResponse) {
    localStorage.setItem(tokenKey, authData.token);
    localStorage.setItem(expirationKey, authData.expiration.toString());
}

export function getClaims(): claim[] {
    const token = localStorage.getItem(tokenKey);
    if (!token) {
        return [];
    }

    const expiration = localStorage.getItem(expirationKey)!;  //! cast expiration to string, since it can also be of type null
    const expirationDate = new Date(expiration);
    if (expirationDate <= new Date()) { //means token has expired
        logout();
        return [];
    }

    //Rem: a token consist of 3 parts and the middle part is the claims
    const dataToken = JSON.parse(atob(token.split('.')[1]));    //return objects of claims eg {email:'email@email.com'}
    const response: claim[] = [];
    for (const property in dataToken) {
        response.push({name: property, value: dataToken[property]});
    }

    return response;
}

export function logout() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(expirationKey);
}

export function getToken() {
    return localStorage.getItem(tokenKey);
}