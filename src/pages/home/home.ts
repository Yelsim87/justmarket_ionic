import { Component } from '@angular/core';
import {AlertController, Events, Loading, LoadingController, NavController, Platform} from 'ionic-angular';
import {RegistraPage} from "../registra/registra";
import {Utente} from "../../Utente";
import {LoginProvider} from "../../providers/login/login";
import {ProfiloutentePage} from "../profiloutente/profiloutente";
import {ProductListPage} from "../product-list/product-list";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  regPage: any;
  profPage: any;
  prodPage: any;
  trollo: string = "false";
  user: string = "";
  pass: string = "";
  userlog = new Utente;
  loading: Loading;

  constructor(private face:Facebook, public event: Events, public loadingCtrl: LoadingController, public platform: Platform, public nav: NavController, private loginService: LoginProvider, private alertCtrl: AlertController) {
    this.regPage = RegistraPage;
      this.profPage = ProfiloutentePage;
     this.platform.ready().then(() => {
       this.isLog();
     })
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
      this.showLoading();
      this.isLog();
      this.outProf();
      this.event.publish("loggo");
      this.loading.dismiss();
      this.nav.setRoot(ProductListPage)
    }, err => {
      this.presentAlert3();
      console.log(err);
    })
  }

  isLog() {
    this.loginService.isLog().subscribe(d => {
      console.log(d);
      this.trollo = d;
      this.event.publish("loggo");
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

  facebookLog(){
      this.face.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
        .catch(e => console.log('Error logging into Facebook', e));
  }

}
