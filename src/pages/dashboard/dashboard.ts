import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, App, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { NotificationsPage } from '../notifications/notifications';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  quote : String = "Bienvenue dans votre espace personnel"
  email :String  = "Getting your email"
  UNSEEN : Number;
  constructor(private storage: Storage,public toastCtrl: ToastController ,public user: UserProvider ,public appCtrl: App ,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public auth : AuthProvider) {
    this.storage.get('user').then((val) => {
      console.log('Your session is', val);
      this.auth.getSomeDatas(val).subscribe(data => {
        console.log(data)
        if(data.status){
          this.email = data.email;
          this.user.getNumberOfNotifications(data.email).subscribe(dt =>{
            console.log(dt)
            this.UNSEEN = dt
          })
        }else{
          this.appCtrl.getRootNav().setRoot(HomePage);
        }
      })
    });
    
    /*
    this.auth.getSomeData().subscribe(data =>{
    
      console.log("dashboard's data : ")
      console.log(data)
      if(data.status){
        this.email = data.email
        this.user.getNumberOfNotifications(data.email).subscribe(dt =>{
          console.log(dt)
          this.UNSEEN = dt
        })
      }else{
        this.appCtrl.getRootNav().setRoot(HomePage);
      }
    })
    */
  }
  logout(){
    this.auth.logoutC(this.email).subscribe(resl =>{
      console.log("logging in C")
      this.storage.set('user', 'none');
      console.log(resl)
    })
    this.auth.logout().subscribe(res => {
      if(res.success){
        this.navCtrl.push(HomePage)
        this.viewCtrl.dismiss()
      }
    })
    
  }
  notificationIco(){
    this.appCtrl.getRootNav().setRoot(NotificationsPage);
  }
  ionViewDidLoad() {
  }

}
