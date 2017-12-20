import {Prodotto} from "./Prodotto";

export class Transazione{
  id?: number;
  codiceTransazione: string;
  prezzoNoIva: number;
  prezzoIva: number;
  numeroCarta: string;
  listaProdotti: Array<Prodotto>;
  data:string;
}
