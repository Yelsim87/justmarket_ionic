import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {indirizzo} from "../../indirizzo";
import {Utente} from "../../Utente";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  inLog(user: Utente) {
    console.log(indirizzo + '/login' + user);
    return this.http.post(indirizzo + '/login', user, httpOptions);
  }

  inReg(user: Utente) {
    console.log(indirizzo + '/register/'+ user);
    return this.http.post(indirizzo + '/register', user, httpOptions);
  }

  isLog() {
    console.log('ciao'+ ' '+localStorage.getItem('token'));
    return this.http.get(indirizzo + '/islogged',{responseType: 'text'});
  }

  outLog() {
    console.log('qui ci sono');
    return this.http.get(indirizzo + '/logoutApp',{responseType: 'text'});
  }

  outProf() {
    return this.http.get(indirizzo + '/userdetails', httpOptions);
  }

}
