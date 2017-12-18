import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";

@IonicPage()
@Component({
  selector: 'page-storico',
  templateUrl: 'storico.html',
})
export class StoricoPage {
  trollo: string;

  constructor(private loginService: LoginProvider) {
    this.isLog();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoricoPage');
  }

  isLog() {
    this.loginService.isLog().subscribe(d => {
      console.log(d);
      this.trollo = d;
    })
  }

}
