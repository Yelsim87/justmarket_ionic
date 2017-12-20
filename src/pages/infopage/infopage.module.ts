import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfopagePage } from './infopage';

@NgModule({
  declarations: [
    InfopagePage,
  ],
  imports: [
    IonicPageModule.forChild(InfopagePage),
  ],
})
export class InfopagePageModule {}
