import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ToastController   } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(private storage: Storage,public toastCtrl: ToastController ,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, public auth : AuthProvider) {
  }

  ionViewDidLoad() {
  }
  login(form,event){
    var target = event.target
    var email =  target.email.value 
    var mdp  = target.password.value 


  




    this.auth.login(email,mdp).subscribe((res)=>{

      



      console.log("data")
      console.log(res)

      if(res.success){
        
        this.navCtrl.remove(0);
        this.storage.set('user', res.message);
        this.navCtrl.push( DashboardPage,{
          "email" : email
        })
        this.viewCtrl.dismiss()
      }else{
        let toast = this.toastCtrl.create({
          message: 'email ou mdp invalid',
          duration: 3000,
          position: 'top'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      }
    },(err)=>{
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 3000,
        position: 'top'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }) ;
  }
  rootToRegistrationPage(){
    this.navCtrl.push(RegisterPage)
  }
}
