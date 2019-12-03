import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDemandPage } from './add-demand';

@NgModule({
  declarations: [
    AddDemandPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDemandPage),
  ],
})
export class AddDemandPageModule {}
