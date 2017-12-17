import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ListaprodottiPage} from "../listaprodotti/listaprodotti";
import {LoginProvider} from "../../providers/login/login";

@IonicPage()
@Component({
  selector: 'page-carrello',
  templateUrl: 'carrello.html',
})
export class CarrelloPage {
  trollo: string = 'false';
  listPage: any;

  constructor(public nav: NavController, private loginService: LoginProvider) {
    this.isLog();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrelloPage');
  }

  isLog() {
    this.loginService.isLog().subscribe(d => {
      console.log(d);
      this.trollo = d;
    })
  }

  changePage() {
    this.nav.setRoot(ListaprodottiPage);
  }

}
