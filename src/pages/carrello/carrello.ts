import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, Platform} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {Prodotto} from "../../Prodotto";
import {Transazione} from "../../Transazione";
import {CreditCardProvider} from "../../providers/credit-card/credit-card";
import {TransizioniProvider} from "../../providers/transizioni/transizioni";

@IonicPage()
@Component({
  selector: 'page-carrello',
  templateUrl: 'carrello.html',
})
export class CarrelloPage {
  listaCarrello = new Array<Prodotto>();
  loading: Loading;
  prezzoTotale: number;
  offersDate = new Date();
  dateNow = new Date();
  ddNow = new Date();
  dddNow = new Date();
  crediCard = 0
  listaCarte = new Array()
  transazione = new Transazione()

  constructor(private transService:TransizioniProvider, private creditService: CreditCardProvider, public loadingCtrl: LoadingController, public platform: Platform, public nav: NavController, private loginService: LoginProvider) {
    this.platform.ready().then(() => {
      this.showLoading();
      this.getLista();
      this.getCarte()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrelloPage');
  }

  deleteCarrello(product: Prodotto) {
    console.log(product)
    let index=0;
    let cacca: number =0
    for(let x of this.listaCarrello){

      if(product.id==x.id){
        index=cacca;
      }
      cacca++
    }
    this.listaCarrello.splice(index, 1);
    localStorage.setItem('carrello', JSON.stringify(this.listaCarrello));
    this.getLista();
  }

  getLista() {
    this.offersDate.setDate(this.offersDate.getDate() + 3);
    this.ddNow.setDate(this.ddNow.getDate() - 1);
    this.dddNow.setDate(this.dddNow.getDate() + 1);
    if (localStorage.getItem('carrello') == null) {
      localStorage.setItem('carrello', JSON.stringify(new Array()));
    }
    this.listaCarrello = JSON.parse(localStorage.getItem('carrello'));
    for (let prod of this.listaCarrello) {
      prod.dataScadenza = new Date(prod.dataScadenza);
    }
    this.prezzoTotale = 0;
    for (let prod of this.listaCarrello) {
      if (this.offersDate < prod.dataScadenza) {
        this.prezzoTotale += prod.prezzoUnitario * prod.quantitaDaAcquistare;
      } else if (this.offersDate > prod.dataScadenza && this.dateNow < prod.dataScadenza) {
        this.prezzoTotale += (prod.prezzoUnitario * 0.7) * prod.quantitaDaAcquistare;
      } else if (this.ddNow < prod.dataScadenza && this.dddNow > prod.dataScadenza) {
        this.prezzoTotale += (prod.prezzoUnitario * 0.3) * prod.quantitaDaAcquistare;
      }
    }
    this.loading.dismiss();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });
    this.loading.present();
  }

  buyCarrello() {
    if (this.crediCard != 0 && JSON.parse(localStorage.getItem('carrello')).length != 0) {
      this.transazione.listaProdotti = JSON.parse(localStorage.getItem('carrello'))
      localStorage.setItem('carrello', JSON.stringify(new Array()));
      console.log(this.transazione)
      this.transService.saveTransaction(this.transazione, this.crediCard).subscribe(result => {
          this.listaCarrello = new Array()
          console.log(result)

          this.prezzoTotale = 0;
        }
      )
    }
  }


  getCarte() {
    this.listaCarte = new Array()
    this.creditService.getAll().subscribe(d => {
      console.log(d)
      this.listaCarte = d;
      for (let card of this.listaCarte) {
        card.numeroCarta = atob(card.numeroCarta)
        console.log(card)
      }

    })
  }
}
