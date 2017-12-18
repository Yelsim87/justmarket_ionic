import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {indirizzo} from "../../indirizzo";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ListaprodottiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ListaprodottiProvider Provider');
  }

  outProd() {
    return this.http.get(indirizzo + '/prodotti/getall', httpOptions);
  }

}
