import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {Utente} from "../../Utente";
import {LoginProvider} from "../../providers/login/login";
import {ProfiloutentePage} from "../profiloutente/profiloutente";

@IonicPage()
@Component({
  selector: 'page-listaprodotti',
  templateUrl: 'listaprodotti.html',
})
export class ListaprodottiPage {
  listap = ['banane', 'pere', 'mele'];
  userlog: Utente;
  trollo: string = "false";
  profPage: any;

  constructor(public nav: NavController, private alertCtrl: AlertController, private loginService: LoginProvider) {
    this.isLog();
    this.outProf();
    this.profPage = ProfiloutentePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaprodottiPage');
  }

  outLog() {
    this.loginService.outLog().subscribe(() => {
      localStorage.setItem('token','');
      this.presentAlert2(this.userlog.nome);
      this.isLog();
    }, errore => {console.log(errore);
    })
  }

  isLog() {
    this.loginService.isLog().subscribe(d => {
      console.log(d);
      this.trollo = d;
    })
  }

  outProf() {
    this.loginService.outProf().subscribe(datiuser => {
      console.log(datiuser);
      this.userlog = <Utente>datiuser;
    })
  }

  presentAlert2(a: string) {
    let alert = this.alertCtrl.create({
      title: 'Arrivederci, ' + a + '!',
      subTitle: 'Log-out effettuato.',
      buttons: ['OK']
    });
    alert.present();
  }

}
