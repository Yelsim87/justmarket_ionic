import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {indirizzo} from "../../indirizzo";
import {Transazione} from "../../Transazione";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TransizioniProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TransizioniProvider Provider');
  }

  saveTransaction(transaction:Transazione, id:number){
    return this.http.post(indirizzo + '/transazione/buy/'+id, transaction, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'text'
    });
  }

  getAll(){
    return this.http.get(indirizzo + '/transazione/getall', httpOptions)
  }

}
