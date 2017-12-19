import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, LoadingController, Loading, Events, MenuController, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {ListaprodottiPage} from "../pages/listaprodotti/listaprodotti";
import {StoricoPage} from "../pages/storico/storico";
import {LoginProvider} from "../providers/login/login";
import {ProfiloutentePage} from "../pages/profiloutente/profiloutente";
import {CarrelloPage} from "../pages/carrello/carrello";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  trollo: string = 'false';
  rootPage: any = HomePage;
  loading: Loading;

  pages: Array<{title: string, component: any}>;

  constructor(private alertCtrl: AlertController, public menuCtrl: MenuController, public event: Events, public loadingCtrl: LoadingController, private loginService: LoginProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.event.subscribe("loggo", () => { this.isLog() });
    this.initializeApp();
    this.platform.ready().then(() => {
      this.showLoading();
      this.changeMenu();
    })
  }

    changePage() {
    this.nav.push(ProfiloutentePage);
      this.menuCtrl.close();
  }

  isLog() {
    this.loginService.isLog().subscribe(d => {
      this.trollo = d;
      console.log("stiamo nella home: " + d);
      this.changeMenu();
      this.loading.dismiss();
    })
  }

  outLog() {
    this.loginService.outLog().subscribe(() => {
      localStorage.setItem('token','');
      this.isLog();
      this.nav.setRoot(HomePage);
      this.menuCtrl.close();
      this.presentAlert2();
    }, errore => {console.log(errore);
    })
  }

  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Arrivederci!',
      subTitle: 'Log-out effettuato.',
      buttons: ['OK']
    });
    alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });
    this.loading.present();
  }

  changeMenu() {
    if(this.trollo === 'false') {
      console.log("qui ci sono " + this.trollo);
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Prodotti', component: ListaprodottiPage }
      ];
    }
    if(this.trollo === 'true') {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Prodotti', component: ListaprodottiPage },
        { title: 'Carrello', component: CarrelloPage },
        { title: 'Storico', component: StoricoPage }
      ];
    }
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
