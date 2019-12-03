import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider} from '../../providers/auth/auth'
import { DashboardPage } from '../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html',
})
export class Register2Page {
  nom : String;
  prenom : String;
  email: String;
  age: number;
  tel : String;
  password : String;
  sexe : String;
  haveCar :boolean;
  car : String;
  car_mat: String;
  car_places : number;
  invalidPl: Boolean = false;
  constructor(private toastCtrl: ToastController,public appCtrl:App,public auth:AuthProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.nom = this.navParams.get("nom");
    this.prenom = this.navParams.get("prenom");
    this.email = this.navParams.get("email");
    this.age = this.navParams.get("age");
    this.tel = this.navParams.get("tel");
    this.password = this.navParams.get("password");
    this.sexe = this.navParams.get("sexe");
    this.haveCar = this.navParams.get("haveCar");

  }
  register2(form,event){
    var target = event.target;
    this.car = target.car.value;
    this.car_mat = target.car_mat.value;
    this.car_places = target.car_places.value;
    console.log("car places "+this.car_places)
    if(this.car_places < 1){
      this.invalidPl =true;
      let toast = this.toastCtrl.create({
        message: 'le capacite de la voiture est invalide ',
        duration: 3000,
        position: 'top'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }else{
      this.auth.registerUserCond(this.nom , this.prenom ,this.email,this.age,this.tel,this.sexe,this.password,this.car,this.car_places,this.car_mat ).subscribe(data =>{
        this.appCtrl.getRootNav().setRoot(DashboardPage);
        
      })
    }
    
  }
  ionViewDidLoad() {
  }

}
