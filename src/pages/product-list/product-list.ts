import { Component } from '@angular/core';
import {
  IonicPage, NavController, Loading, LoadingController, Platform, AlertController,
  ToastController
} from 'ionic-angular';
import {LoginProvider} from "../../providers/login/login";
import {ProfiloutentePage} from "../profiloutente/profiloutente";
import {ListaprodottiProvider} from "../../providers/listaprodotti/listaprodotti";
import {Prodotto} from "../../Prodotto";

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  carrello: Array<Prodotto> = new Array();
  trollo: string = "false";
  profPage: any;
  prodotti: string;
  li = new Array<Prodotto>();
  loading: Loading;
  listaProdottiTotale = new Array<Prodotto>();
  listaTotaleFiltrata= new Array<Prodotto>();
  cerca: string = '';
  cercaa: string = '' ;
  listaProdottiCarrello = new Array<Prodotto>();
  offerte:boolean;
  disponibili:boolean;
  lowPrice:boolean=true;
  midPrice:boolean=true;
  highPrice:boolean=true;


  constructor(public toastCtrl: ToastController,public loadingCtrl: LoadingController, public platform: Platform, private listaService: ListaprodottiProvider,public nav: NavController, private loginService: LoginProvider,public alertCtrl: AlertController) {
    this.platform.ready().then(() => {
      this.showLoading();
      this.outProd();
      this.filtraT()
      this.isLog();
    })
    if (localStorage.getItem('carrello') == null) {
      console.log("qui")
      localStorage.setItem('carrello', JSON.stringify(new Array()));
    }
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
      this.listaTotaleFiltrata=<Array<Prodotto>>listap;

    },err => {
      console.log(err);
    })
  }



  filtraT() {

      this.listaTotaleFiltrata=new Array()
    if(this.lowPrice)
      this.listaTotaleFiltrata = this.listaProdottiTotale.filter(prod => prod.prezzoUnitario>0 && prod.prezzoUnitario<=2 );

    if(this.midPrice)
      this.listaTotaleFiltrata = this.listaProdottiTotale.filter(prod => prod.prezzoUnitario>=2 && prod.prezzoUnitario<=9 ).concat(this.listaTotaleFiltrata);

    if(this.highPrice)
      this.listaTotaleFiltrata = this.listaProdottiTotale.filter(prod => prod.prezzoUnitario>9 ).concat(this.listaTotaleFiltrata);

    if(!this.lowPrice&&!this.midPrice&&!this.highPrice)
      this.listaTotaleFiltrata=this.listaProdottiTotale

    if(this.cerca != '') {
      this.listaTotaleFiltrata = this.listaTotaleFiltrata.filter(prod =>
        prod.marca.toLowerCase().includes(this.cerca.toLowerCase())||prod.nome.toLowerCase().includes(this.cerca.toLowerCase()))

    };

    if(this.offerte)
      this.listaTotaleFiltrata = this.listaTotaleFiltrata.filter(prod => prod.offerta===true);

    if(!this.disponibili)
      this.listaTotaleFiltrata = this.listaTotaleFiltrata.filter(prod => prod.quantita>0 );

    if(this.cerca!=null)
      this.listaTotaleFiltrata = this.listaTotaleFiltrata.filter(prod =>
        prod.marca.toLowerCase().includes(this.cerca.toLowerCase())||prod.nome.toLowerCase().includes(this.cerca.toLowerCase())
      );

  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Caricamento..."
    });
    this.loading.present();
  }

  aggiungiAlCarrello(prod:Prodotto) {
    let toast = this.toastCtrl.create({
      message: 'Prodotto aggiunto al carrelo!',
      duration: 3000
    });
    console.log(prod)
    let id:number=0;
    let x:number=0;
    let control:boolean;
    if (JSON.parse(localStorage.getItem('carrello')) === null) {
      localStorage.setItem('carrello', JSON.stringify(this.carrello));
    }
    this.listaProdottiCarrello=<Array<Prodotto>>JSON.parse(localStorage.getItem("carrello")  );
    console.log(this.listaProdottiCarrello)
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
    toast.present();
  }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Filtro Prodotti');

    alert.addInput({
      type: 'checkbox',
      label: 'Solo offerte',
      value: 'offerte',
      checked: this.offerte
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Mostra Terminati',
      value: 'disponibili',
      checked: this.disponibili
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Da 0€ a 2€',
      value: 'lowPrice',
      checked: this.lowPrice
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Da 2€ a 9€',
      value: 'midPrice',
      checked: this.midPrice
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Da 9€',
      value: 'highPrice',
      checked: this.highPrice
    });



    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        let filtro:Array<string>=data

        if(filtro.toString().includes("offerte"))
          this.offerte=true
        else
          this.offerte=false

        if(filtro.toString().includes("disponibili"))
          this.disponibili=true
        else
          this.disponibili=false

        if(filtro.toString().includes("lowPrice"))
          this.lowPrice=true
        else
          this.lowPrice=false

        if(filtro.toString().includes("midPrice"))
          this.midPrice=true
        else
          this.midPrice=false

        if(filtro.toString().includes("highPrice"))
          this.highPrice=true
        else
          this.highPrice=false

        this.filtraT()
      }
    });
    alert.present();
  }

}
