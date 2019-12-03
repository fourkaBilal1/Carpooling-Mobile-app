import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DemandProvider } from '../../providers/demand/demand'
import { UserProvider } from '../../providers/user/user';


interface UserData{
  "_id" : String,
  "email" : String,
	"password" : String,
	"nom" : String,
	"prenom" : String,
	"age" : String,
	"tel" : String,
  "sexe" : String,
  "Etat" : String
}

interface demandForOfferType{
  user : UserData,
  idReservation : String

}

@IonicPage()
@Component({
  selector: 'page-demands-for-offer',
  templateUrl: 'demands-for-offer.html',
})
export class DemandsForOfferPage {
  email : String;
  idOffer : String;
  items : demandForOfferType[]=[];
  itemd : demandForOfferType;
  constructor(public user:UserProvider, public demand: DemandProvider,  public navCtrl: NavController, public navParams: NavParams) {
    this.email =  this.navParams.get("email")
    this.idOffer =  this.navParams.get("idOffer")
    this.demand.getDemandsForOffer(this.idOffer).subscribe(data => {
      data.listReservation.forEach((reservation,index)=>{
        this.user.getUserData(reservation.emailDemand).subscribe(datar =>{
          datar.Etat = reservation.Etat
          this.itemd = {"user" :datar,"idReservation":reservation._id}
          this.items.push(this.itemd)
        })
      })
    })
    
  }
  acceptDemand(event,id,index){
    console.log("id Rese : "+ id)
    this.items[index].user.Etat = "accepted"
    this.demand.acceptDemand(id).subscribe(dt =>{
      console.log(dt)
    })
  }
  rejectDemand(event,id,index){
    this.items[index].user.Etat = "rejected"
    this.demand.rejectDemand(id).subscribe(dt =>{
    })
  }

  ionViewDidLoad() {
  }

}
