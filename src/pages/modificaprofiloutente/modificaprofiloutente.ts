import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, Platform} from 'ionic-angular';
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
  cognome:string='';
  citta:string='';
  via:string='';
  provincia:string='';
  cell:string='';
  eemail:string='';
  pass:string='';
  cap:string='';

  userlog = new Utente;
  loading: Loading;

  constructor(public loadingCtrl: LoadingController, public platform: Platform, public nav: NavController, private alertCtrl: AlertController, private loginP: LoginProvider, private loginService: LoginProvider) {
    this.platform.ready().then(() => {
      this.showLoading();
      this.isLog();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificaprofiloutentePage');
  }

  inMod() {
    console.log('ciao');
    console.log(this.userlog);
      console.log(this.userlog);
      this.loginP.inMod(this.userlog).subscribe(data => {
        console.log(data);
        // this.showLoading();
        this.outLog();
        // this.showLoading();
        this.nav.setRoot(HomePage);
        this.presentAlert3();
      }, e => {
        console.log(e);
      })
  }

  inReg() {
    console.log('ciao');
    console.log(this.userlog);
    console.log(this.userlog);
    this.loginP.inReg(this.userlog).subscribe(data => {
      console.log(data);
      this.showLoading();
      this.outLog();
      this.showLoading();
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
      if(this.trollo === 'true') {
        this.outProf();
      }
      this.loading.dismiss();
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
      this.isLog();
      this.nav.setRoot(HomePage)
    }, errore => {console.log(errore);
    })
  }

  presentAlert3() {
    let alert = this.alertCtrl.create({
      title: 'Modifiche apportate!',
      subTitle: 'Prego, rifare il log-in',
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
