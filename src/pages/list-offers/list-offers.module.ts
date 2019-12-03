import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOffersPage } from './list-offers';

@NgModule({
  declarations: [
    ListOffersPage,
  ],
  imports: [
    IonicPageModule.forChild(ListOffersPage),
  ],
})
export class ListOffersPageModule {}
