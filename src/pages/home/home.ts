import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { AuthProvider } from '../../providers/auth/auth';
import { DashboardPage } from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public storage: Storage,public appCtrl: App,public auth: AuthProvider ,public navCtrl: NavController) {
    this.storage.get("user").then((val) => {
      console.log('Your session is', val);
      this.auth.getSomeDatas(val).subscribe(data => {
        console.log(data)
        if(data.status){
          this.appCtrl.getRootNav().setRoot(DashboardPage); 
        }
      })
    });
    
  }
  rootToLoginPage(){
    this.navCtrl.push(LoginPage);
  }
  rootToRegistrationPage(){
    this.navCtrl.push(RegisterPage);
  }
}
