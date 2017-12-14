import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {Utente} from "../../Utente";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-registra',
  templateUrl: 'registra.html',
})
export class RegistraPage {
nome:string='';
cognome:string='';
citta:string='';
via:string='';
provincia:string='';
cell:string='';
eemail:string='';
pass:string='';
cap:string='';

  constructor(public nav: NavController, private loginP: LoginProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistraPage');
  }

  inReg() {
    let user = new Utente;
    user.username = this.eemail;
    user.password = this.pass;
    user.nome = this.nome;
    user.cognome = this.cognome;
    user.citta = this.citta;
    user.via = this.via;
    user.provincia = this.provincia;
    user.cellulare = this.cell;
    user.cap = this.cap;
    user.tipo = 'NORMALE';
    console.log(user + 'siamo qui')
    this.loginP.inReg(user).subscribe(data => {
      console.log(data);
        this.nav.setRoot(HomePage);
        this.presentAlert(user.nome, user.cognome);
    }, e => {
      console.log(e);
      this.presentAlert1(user.nome);
    })
  }

  presentAlert(a: string, b: string) {
    let alert = this.alertCtrl.create({
      title: 'Registrazione effettuata, ' + a + ' ' + b + '!',
      subTitle: 'Grazie per aver effettuato la registrazione presso JustMarket. Effettua il login per accedere ai nostri prodotti.',
      buttons: ['OK']
    });
    alert.present();
  }

  presentAlert1(aa: string) {
    let alert = this.alertCtrl.create({
      title: 'Sei già registrato, ' + ' ' + aa + '!',
      subTitle: 'Fa il loggin alla home.',
      buttons: ['OK']
    });
    alert.present();
  }

}
