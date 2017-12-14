import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {Utente} from "../../Utente";
import {LoginProvider} from "../../providers/login/login";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-modificaprofiloutente',
  templateUrl: 'modificaprofiloutente.html',
})
export class ModificaprofiloutentePage {
  trollo: string = "false";
  nome:string='';
  cognome:string='';
  citta:string='';
  via:string='';
  provincia:string='';
  cell:string='';
  eemail:string='';
  pass:string='';
  cap:string='';

  userlog = new Utente;

  constructor(public nav: NavController, private alertCtrl: AlertController, private loginP: LoginProvider, private loginService: LoginProvider) {
  this.isLog();
  this.outProf();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificaprofiloutentePage');
  }

  inReg() {
    console.log('ciao');
    console.log(this.userlog);
    let user = new Utente;
      user.id = this.userlog.id;
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
      console.log(user);
      this.loginP.inReg(user).subscribe(data => {
        console.log(data);
        this.outLog();
        this.nav.setRoot(HomePage);
        this.presentAlert3();
      }, e => {
        console.log(e);
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
      console.log("Dal profilo:" + " "+ datiuser);
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

  presentAlert3() {
    let alert = this.alertCtrl.create({
      title: 'Modifiche apportate!',
      subTitle: 'Prego, rifare il log-in',
      buttons: ['OK']
    });
    alert.present();
  }

}
