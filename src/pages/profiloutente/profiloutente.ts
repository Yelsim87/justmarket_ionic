import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Utente} from "../../Utente";
import {LoginProvider} from "../../providers/login/login";
import {ModificaprofiloutentePage} from "../modificaprofiloutente/modificaprofiloutente";

@IonicPage()
@Component({
  selector: 'page-profiloutente',
  templateUrl: 'profiloutente.html',
})
export class ProfiloutentePage {
  modPage: any;
  userlog: Utente;
  trollo: string;

  constructor(private loginService: LoginProvider, public nav: NavController) {
    this.outProf();
    this.isLog();
    this.modPage = ModificaprofiloutentePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloutentePage');
  }

  outProf() {
    this.loginService.outProf().subscribe(datiuser => {
      console.log("Dal profilo:" + " "+ datiuser);
      this.userlog = <Utente>datiuser;
    })
  }
  isLog() {
    this.loginService.isLog().subscribe(d => {
      console.log(d);
      this.trollo = d;
    })
  }

}
