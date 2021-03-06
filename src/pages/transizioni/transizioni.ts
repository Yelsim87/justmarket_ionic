import { Component } from '@angular/core';
import {IonicPage, NavController, LoadingController, Platform, Loading} from 'ionic-angular';
import {TransizioniProvider} from "../../providers/transizioni/transizioni";
import {Transazione} from "../../Transazione";
import {InfopagePage} from "../infopage/infopage";

@IonicPage()
@Component({
  selector: 'page-transizioni',
  templateUrl: 'transizioni.html',
})
export class TransizioniPage {
  listaTransizione = new Array<Transazione>();
  loading: Loading;

  constructor(private transService: TransizioniProvider, public navCtrl: NavController, public loadingCtrl: LoadingController, public platform: Platform) {
      this.getAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransizioniPage');
  }

  getAll() {
    this.transService.getAll().subscribe(listT => {
      this.listaTransizione = <Array<Transazione>>listT;
      for(let s of this.listaTransizione) {
        s.numeroCarta = atob(s.numeroCarta);
      }
    },err => {
      console.log(err);
    })
  }

  changePage(trans:Transazione) {
    this.navCtrl.push(InfopagePage, {trans:trans});
  }

}
