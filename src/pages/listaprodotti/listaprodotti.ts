import { Component } from '@angular/core';
import {IonicPage, NavController, Loading, LoadingController, Platform} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {ProfiloutentePage} from "../profiloutente/profiloutente";
import {CarrelloPage} from "../carrello/carrello";
import {ListaprodottiProvider} from "../../providers/listaprodotti/listaprodotti";
import {Prodotto} from "../../Prodotto";

@IonicPage()
@Component({
  selector: 'page-listaprodotti',
  templateUrl: 'listaprodotti.html',
})
export class ListaprodottiPage {
  trollo: string = "false";
  profPage: any;
  prodotti: string;
  li = new Array<Prodotto>();
  loading: Loading;
  listaSel= new Array<Prodotto>();
  listaSell= new Array<Prodotto>();
  cerca: string = '';

  constructor(public loadingCtrl: LoadingController, public platform: Platform, private listaService: ListaprodottiProvider,public nav: NavController, private loginService: LoginProvider) {
    this.platform.ready().then(() => {
      this.showLoading();
      this.outProd();
      this.isLog();
    })
    this.profPage = ProfiloutentePage;
    this.prodotti = "tot";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaprodottiPage');
  }

  isLog() {
    this.loginService.isLog().subscribe(d => {
      console.log(d);
      this.trollo = d;
      this.loading.dismiss();
    })
  }

  changePage() {
    this.nav.setRoot(CarrelloPage);
  }

  outProd() {
    this.listaService.outProd().subscribe(listap => {
      this.li = <Array<Prodotto>>listap;
      this.listaSel=this.li;
      this.listaSell = this.li;
      this.filtra();
    },err => {
      console.log(err);
    })
  }

  filtra(){
      this.listaSel = this.listaSel.filter(prod => prod.offerta===true );
      this.listaSell = this.listaSell.filter(prod => prod.offerta===false );
  }

  filtraS() {
    this.listaSel = this.listaSel.filter(prod =>
      prod.marca.toLowerCase().includes(this.cerca.toLowerCase())||prod.nome.toLowerCase().includes(this.cerca.toLowerCase())
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });
    this.loading.present();
  }

}
