import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, Platform} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {Prodotto} from "../../Prodotto";

@IonicPage()
@Component({
  selector: 'page-carrello',
  templateUrl: 'carrello.html',
})
export class CarrelloPage {
  listaCarrello = new Array<Prodotto>();
  loading: Loading;

  constructor(public loadingCtrl: LoadingController, public platform: Platform, public nav: NavController, private loginService: LoginProvider) {
    this.platform.ready().then(() => {
      this.showLoading();
      this.getLista();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrelloPage');
  }

  getLista() {
    if (JSON.parse(localStorage.getItem('carrello')) === null) {
      console.log("sono entrato nell'if");
      localStorage.setItem('carrello', JSON.stringify(this.listaCarrello));
    }
    this.listaCarrello = JSON.parse(localStorage.getItem('carrello'));
    console.log('nel carrello' + this.listaCarrello);
    this.loading.dismiss();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });
    this.loading.present();
  }

}
