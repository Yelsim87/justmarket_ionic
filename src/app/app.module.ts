import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistraPage } from "../pages/registra/registra";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ListaprodottiPage} from "../pages/listaprodotti/listaprodotti";
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from "@angular/common/http";
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { SharedProvider } from '../providers/shared/shared';
import { LoginProvider } from '../providers/login/login';
import {ProfiloutentePage} from "../pages/profiloutente/profiloutente";
import {ModificaprofiloutentePage} from "../pages/modificaprofiloutente/modificaprofiloutente";
import {StoricoPage} from "../pages/storico/storico";
import {CarrelloPage} from "../pages/carrello/carrello";
import { ListaprodottiProvider } from '../providers/listaprodotti/listaprodotti';
import { StoricoJmProvider } from '../providers/storico-jm/storico-jm';
import { TransizioniProvider } from '../providers/transizioni/transizioni';
import {ProductListPage} from "../pages/product-list/product-list";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistraPage,
    ProfiloutentePage,
    ModificaprofiloutentePage,
    StoricoPage,
    ListaprodottiPage,
    CarrelloPage,
    ProductListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistraPage,
    ProfiloutentePage,
    ModificaprofiloutentePage,
    StoricoPage,
    ListaprodottiPage,
    CarrelloPage,
    ProductListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider,
      multi: true,
    },
    SharedProvider,
    LoginProvider,
    ListaprodottiProvider,
    StoricoJmProvider,
    TransizioniProvider
  ]
})
export class AppModule {}
