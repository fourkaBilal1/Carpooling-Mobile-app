import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  passagerRoot = 'PassagerPage'
  conducteurRoot = 'ConducteurPage'
  notificationsRoot = 'NotificationsPage'
  besoinAideRoot = 'BesoinAidePage'


  constructor(public navCtrl: NavController) {}

}
