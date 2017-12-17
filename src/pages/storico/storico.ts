import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {RegistraPage} from "../registra/registra";
import {ProfiloutentePage} from "../profiloutente/profiloutente";
import {LoginProvider} from "../../providers/login/login";
import {Utente} from "../../Utente";

@IonicPage()
@Component({
  selector: 'page-storico',
  templateUrl: 'storico.html',
})
export class StoricoPage {
  regPage: any;
  profPage: any;
  trollo: string;
  userlog = new Utente;

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: NavController, private loginService: LoginProvider, private alertCtrl: AlertController) {
    this.regPage = RegistraPage;
    this.profPage = ProfiloutentePage;
    this.isLog();
    this.outProf();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoricoPage');
  }

  isLog() {
    this.loginService.isLog().subscribe(d => {
      console.log(d);
      this.trollo = d;
      if(this.trollo === 'true') {
        this.outProf();
      }
    })
  }

  outProf() {
    this.loginService.outProf().subscribe(datiuser => {
      console.log(datiuser);
      this.userlog = <Utente>datiuser;
    })
  }

  outLog() {
    this.loginService.outLog().subscribe(() => {
      localStorage.setItem('token','');
      this.presentAlert2(this.userlog.nome);
      this.isLog();
    }, errore => {console.log(errore);
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
