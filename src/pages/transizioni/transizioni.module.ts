import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransizioniPage } from './transizioni';

@NgModule({
  declarations: [
    TransizioniPage,
  ],
  imports: [
    IonicPageModule.forChild(TransizioniPage),
  ],
})
export class TransizioniPageModule {}
