import { Component } from '@angular/core';
import {IonicPage, NavController, Loading, LoadingController, Platform} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {ProfiloutentePage} from "../profiloutente/profiloutente";
import {ListaprodottiProvider} from "../../providers/listaprodotti/listaprodotti";
import {Prodotto} from "../../Prodotto";

@IonicPage()
@Component({
  selector: 'page-listaprodotti',
  templateUrl: 'listaprodotti.html',
})
export class ListaprodottiPage {
  carrello: Array<Prodotto> = new Array();
  trollo: string = "false";
  profPage: any;
  prodotti: string;
  li = new Array<Prodotto>();
  loading: Loading;
  listaProdottiTotale = new Array<Prodotto>();
  listaFiltrataSenzaOfferte= new Array<Prodotto>();
  listaFiltrataOfferte= new Array<Prodotto>();
  listaTotaleFiltrata= new Array<Prodotto>();
  cerca: string = '';
  cercaa: string = '' ;
  listaProdottiCarrello = new Array<Prodotto>();

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

  outProd() {
    this.listaService.outProd().subscribe(listap => {
      this.listaProdottiTotale=<Array<Prodotto>>listap;
      this.filtra();
    },err => {
      console.log(err);
    })
  }

  filtra(){
      this.listaFiltrataOfferte = this.listaProdottiTotale.filter(prod => prod.offerta===true );
      this.listaFiltrataSenzaOfferte = this.listaProdottiTotale.filter(prod => prod.offerta===false );
      this.listaTotaleFiltrata=this.listaProdottiTotale
      //this.filtraS();
  }


  filtraT() {
    this.listaFiltrataOfferte=this.listaProdottiTotale
    this.listaFiltrataSenzaOfferte=this.listaProdottiTotale
    this.listaTotaleFiltrata=this.listaProdottiTotale

    if(this.cerca != '') {
      this.listaFiltrataOfferte = this.listaFiltrataOfferte.filter(prod =>
        prod.marca.toLowerCase().includes(this.cerca.toLowerCase())||prod.nome.toLowerCase().includes(this.cerca.toLowerCase()))


        this.listaFiltrataSenzaOfferte = this.listaFiltrataSenzaOfferte.filter(prod =>
          prod.marca.toLowerCase().includes(this.cerca.toLowerCase())||prod.nome.toLowerCase().includes(this.cerca.toLowerCase()))

      this.listaTotaleFiltrata = this.listaTotaleFiltrata.filter(prod =>
        prod.marca.toLowerCase().includes(this.cerca.toLowerCase())||prod.nome.toLowerCase().includes(this.cerca.toLowerCase()))
      };

    }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });
    this.loading.present();
  }

  aggiungiAlCarrello(prod:Prodotto) {
    console.log(prod)
    let id:number=0;
    let x:number=0;
    let control:boolean;
    if (JSON.parse(localStorage.getItem('carrello')) === null) {
      localStorage.setItem('carrello', JSON.stringify(this.carrello));
    }
    this.listaProdottiCarrello=<Array<Prodotto>>JSON.parse(localStorage.getItem("carrello")  );
    prod.quantitaDaAcquistare=1;
    for(let p of this.listaProdottiCarrello){
      if(p.id===prod.id) {
        id = x;
        control = true;
      }
      x++;
    }
    console.log(id);
    if(control) {
      this.listaProdottiCarrello[id].quantitaDaAcquistare = this.listaProdottiCarrello[id].quantitaDaAcquistare + 1;
    }
    else {
      this.listaProdottiCarrello.push(prod);
    }
    console.log(this.listaProdottiCarrello);
     console.log("prodotto aggiunto");

    localStorage.setItem('carrello',JSON.stringify(this.listaProdottiCarrello));
  }

}
