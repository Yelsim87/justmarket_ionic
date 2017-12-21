import { Component } from '@angular/core';
import {IonicPage, Loading, NavParams, LoadingController, Platform} from 'ionic-angular';
import {Transazione} from "../../Transazione";
import {Prodotto} from "../../Prodotto";

@IonicPage()
@Component({
  selector: 'page-infopage',
  templateUrl: 'infopage.html',
})
export class InfopagePage {
  lol: Transazione;
  loading: Loading;

  constructor(public navParams: NavParams, public loadingCtrl: LoadingController, public platform: Platform) {
      this.lol = <Transazione>this.navParams.get('trans');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfopagePage');
    console.log(this.lol);
  }

}
