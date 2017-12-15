import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, Platform} from 'ionic-angular';
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
  userlog = new Utente;
  trollo: string;
  loading: Loading;

  constructor(public loadingCtrl: LoadingController, public platform: Platform, private loginService: LoginProvider, public nav: NavController) {
    this.modPage = ModificaprofiloutentePage;
    this.platform.ready().then(() => {
      this.showLoading();
      this.isLog();
    })
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
      if(this.trollo === 'true') {
        this.outProf();
      }
      this.loading.dismiss();
    })
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });
    this.loading.present();
  }

}
