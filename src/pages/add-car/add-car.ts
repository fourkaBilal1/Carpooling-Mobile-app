import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-add-car',
  templateUrl: 'add-car.html',
})
export class AddCarPage {
  email : String;
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,public auth : AuthProvider) {
    this.auth.getSomeData().subscribe(res=>{
      if(res.status){
        this.email = res.email
      }
    })

  }
  addCar(form,event){
    var target = event.target
    var car =  target.car.value 
    var car_places  = target.car_places.value
    var car_mat  = target.car_mat.value

    this.auth.addCar(this.email,car,car_places,car_mat).subscribe(dt=>{
      if(dt.success){
        this.viewCtrl.dismiss()
      }
    })
  }

  ionViewDidLoad() {
  }

}
