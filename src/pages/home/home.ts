import { Component } from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, Platform} from 'ionic-angular';
import {RegistraPage} from "../registra/registra";
import {Utente} from "../../Utente";
import {LoginProvider} from "../../providers/login/login";
import {ProfiloutentePage} from "../profiloutente/profiloutente";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  regPage: any;
  profPage: any;
  trollo: string = "false";
  user: string = "";
  pass: string = "";
  userlog = new Utente;
  loading: Loading;

  constructor(public loadingCtrl: LoadingController, public platform: Platform, public nav: NavController, private loginService: LoginProvider, private alertCtrl: AlertController) {
      this.regPage = RegistraPage;
      this.profPage = ProfiloutentePage;
    // this.platform.ready().then(() => {
    //   this.showLoading();
    //   // this.isLog();
    // })
  }

  inLog() {
    let user = new Utente;
    user.username = this.user;
    user.password = this.pass;
    user.tipo = 'NORMALE';
    this.loginService.inLog(user).subscribe(data => {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', btoa(user.username + ':' + user.password));
      this.isLog();
      this.outProf();
    }, err => {
      this.presentAlert3();
      console.log(err);
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

  outLog() {
    this.loginService.outLog().subscribe(() => {
      localStorage.setItem('token','');
      this.presentAlert2(this.userlog.nome);
      this.isLog();
    }, errore => {console.log(errore);
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

  presentAlert3() {
    let alert = this.alertCtrl.create({
      title: 'Nome utente o password errati!',
      subTitle: 'Inserisci le credenziali esatte',
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });
    this.loading.present();
  }

}
