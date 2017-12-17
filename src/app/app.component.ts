import { Component, ViewChild } from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {ListaprodottiPage} from "../pages/listaprodotti/listaprodotti";
import {StoricoPage} from "../pages/storico/storico";
import {LoginProvider} from "../providers/login/login";
import {ProfiloutentePage} from "../pages/profiloutente/profiloutente";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  trollo: string = 'false';
  rootPage: any = HomePage;
  profPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(private loginService: LoginProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.isLog();
    this.profPage = ProfiloutentePage;

    if(this.trollo === 'false') {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Prodotti', component: ListaprodottiPage }
      ];
    }
    else {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Prodotti', component: ListaprodottiPage },
        { title: 'Storico', component: StoricoPage }
      ];
    }

  }

    changePage() {
    this.nav.setRoot(ProfiloutentePage);
  }

  isLog() {
    this.loginService.isLog().subscribe(d => {
      console.log(d);
      this.trollo = d;
    })
  }

  outLog() {
    this.loginService.outLog().subscribe(() => {
      localStorage.setItem('token','');
      //this.presentAlert2(this.userlog.nome);
      this.isLog();
    }, errore => {console.log(errore);
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
