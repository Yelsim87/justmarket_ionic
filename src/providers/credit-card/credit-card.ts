import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {indirizzo} from "../../indirizzo";
import {CreditCard} from "../../creditCard";

const httpOptions = {
headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CreditCardProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CreditCardProvider Provider');
  }

  getAll(){
    return this.http.get<Array<CreditCard>>(indirizzo+"/creditcard/getall", httpOptions)
  }

}
