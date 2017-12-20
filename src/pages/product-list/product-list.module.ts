import { NgModule } from '@angular/core';
import {AlertController, IonicPageModule} from 'ionic-angular';
import { ProductListPage } from './product-list';

@NgModule({
  declarations: [
    ProductListPage,
    AlertController
  ],
  imports: [
    IonicPageModule.forChild(ProductListPage),
  ],
})
export class ProductListPageModule {}
