import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Register2Page } from '../register2/register2';
import { AuthProvider } from '../../providers/auth/auth'
import { DashboardPage } from '../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  sexe : String;
  haveCar : boolean;
  reg : String;
  invalidPassword : Boolean = false;
  invalidAge : Boolean = false;
  constructor(private toastCtrl: ToastController,public appCtrl : App,public auth: AuthProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.haveCar = false;
    this.sexe = "Homme";
    this.reg = "S'inscrire";

  }
  register1(form,event){
    var target = event.target
    if(target.password.value == target.confirm.value && target.age.value >= 16 ){
      if(this.haveCar){
        this.auth.existingUser(target.email.value).subscribe(ex =>{
          if(ex.success){
            let toast = this.toastCtrl.create({
              message: 'Adresse e-mail déjà utilisée',
              duration: 3000,
              position: 'top'
            });
          
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
          
            toast.present();
          }else{
            this.navCtrl.push(Register2Page,{
              nom:target.nom.value,
              prenom:target.prenom.value,
              email:target.email.value,
              age:target.age.value,
              tel: target.tel.value,
              password:target.password.value,
              sexe: this.sexe,
              haveCar: this.haveCar
            })
          }
        })



        
      }else{
        this.auth.registerUser(target.nom.value,target.prenom.value,target.email.value,target.age.value,target.tel.value,this.sexe,target.password.value).subscribe(data =>{
          if(data.success){
            this.appCtrl.getRootNav().setRoot(DashboardPage);
          }else{
            let toast = this.toastCtrl.create({
              message: 'Adresse e-mail déjà utilisée',
              duration: 3000,
              position: 'top'
            });
          
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
          
            toast.present();
          }
        })
      }
    }else{
      if(target.password.value != target.confirm.value){
        this.invalidPassword = true
        let toast = this.toastCtrl.create({
          message: 'Les mots de passe que vous avez entrés ne sont pas identiques. ',
          duration: 3000,
          position: 'top'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      }
      if(target.age.value < 16){
        this.invalidAge = true
        let toast = this.toastCtrl.create({
          message: 'vous devez avoir 16 ans ou plus',
          duration: 3000,
          position: 'top'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      }
    }
  }
  rootToRegister2(){
    this.navCtrl.push(Register2Page)
  }
  dataChanged(event, haveCar){
    if(haveCar){
      this.reg = "Suivant"
    }else{
      this.reg = "S'inscrire"
    }
  }
  ionViewDidLoad() {
  }

}
