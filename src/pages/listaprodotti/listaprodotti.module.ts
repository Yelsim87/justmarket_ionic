import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaprodottiPage } from './listaprodotti';

@NgModule({
  declarations: [
    ListaprodottiPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaprodottiPage),
  ],
})
export class ListaprodottiPageModule {}
