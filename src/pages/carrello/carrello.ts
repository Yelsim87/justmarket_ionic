import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {ListaprodottiPage} from "../listaprodotti/listaprodotti";
import {LoginProvider} from "../../providers/login/login";
import {Prodotto} from "../../Prodotto";

@IonicPage()
@Component({
  selector: 'page-carrello',
  templateUrl: 'carrello.html',
})
export class CarrelloPage {
  listaCarrello: Array<Prodotto> = new Array();

  constructor(public nav: NavController, private loginService: LoginProvider) {
   this.getLista();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrelloPage');
  }

  getLista() {
    if (JSON.parse(localStorage.getItem('carrello')) === null) {
      localStorage.setItem('carrello', JSON.stringify(this.listaCarrello));
    }
    this.listaCarrello = JSON.parse(localStorage.getItem('carrello'));
    console.log('nel carrello' + this.listaCarrello.toString());
  }

}
