import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Transazione} from "../../Transazione";
import {TransizioniProvider} from "../../providers/transizioni/transizioni";

@IonicPage()
@Component({
  selector: 'page-storico',
  templateUrl: 'storico.html',
})
export class StoricoPage {
  trollo: string;
  listaTransazioni = new Array<Transazione>();

  constructor(private transService: TransizioniProvider) {
    this.getAllTransazioni();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoricoPage');
  }

  getAllTransazioni() {
    this.transService.getAll().subscribe(d => this.listaTransazioni = <Array<Transazione>>d);
  }

}
