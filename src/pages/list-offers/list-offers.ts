import { Component } from '@angular/core';
import { App, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DemandProvider } from '../../providers/demand/demand';
import { OfferProvider } from '../../providers/offer/offer';
import { AuthProvider } from '../../providers/auth/auth';
import { DashboardPage } from '../dashboard/dashboard';
import { Storage } from '@ionic/storage';


interface userType{
  "_id" : String,
  "email" : String,
	"password" : String,
	"nom" : String,
	"prenom" : String,
	"age" : String,
	"tel" : String,
	"sexe" : String,
	"cars": String,
	"demands": String,
	"offers":offerType[] 
}

interface offerType{
  "_id" : String,
  From: String,
	To: String,
	DateSys : Date ,
	Etat : String,
	DateOffer : Date,
  NbPlaces : Number,
  RsPlaces: Number,
	Prix : Number 
}



@IonicPage()
@Component({
  selector: 'page-list-offers',
  templateUrl: 'list-offers.html',
})
export class ListOffersPage {
  contained : Boolean = false;
  email: String;
  from : String;
  to : String ;
  id : String;
  NbPlaces : number;
  idDemand: String;
  datetimepicker : String;
  private list : userType[] = [];
  private offerlist : offerType[] =[];
  listLenght : number = 0;
  constructor(public storage: Storage,public appCtrl:App, public alertCtrl : AlertController, public auth: AuthProvider ,public demand: DemandProvider,public offer: OfferProvider , public navCtrl: NavController, public navParams: NavParams) {
    this.email = this.navParams.get("email");
    this.from = this.navParams.get("from");
    this.to = this.navParams.get("to");
    this.NbPlaces = this.navParams.get("NbPlaces");
    this.datetimepicker = this.navParams.get("datetimepicker");
    this.idDemand = this.navParams.get("idDemand"); 
    this.offer.alreadyReserved(this.email).subscribe(dt =>{
      this.offer.listerOffres(this.email,this.from,this.to,this.datetimepicker).subscribe(data => {
        data.list.forEach(element => {
              this.offerlist = [];
              element.offers.forEach(offer =>{
                if(offer.RsPlaces < this.NbPlaces){
                  this.contained = true
                }else{
                  dt.forEach(idof  =>{
                    console.log("nbpl true contained : offer.RsPlaces = "+offer.RsPlaces+"  , this.NbPlaces = "+this.NbPlaces)
                    if(offer._id.toString() == idof){
                      this.contained = true
                    }
                  })
                }
                if(this.contained == false){
                  this.offerlist.push(offer)
                }
                this.contained = false;
              })
              element.offers = this.offerlist
        });
        
        this.list = data.list
        for(let user of this.list){
          for(let offer of user.offers){
            offer.Etat = offer.DateOffer.toString().substr(11,5) ;
          }
        }
        this.listLenght = this.list.length
      })
    })
    
  }
  presentConfirmR() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Buy',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }
  Reserver(event,emailOffer,idOffer){
    event.preventDefault()



    this.storage.get("user").then((val)=>{
      if(val !="none" && val!=null ){
        this.auth.getSomeDatas(val).subscribe(data =>{
          if(data.status){
            let alert = this.alertCtrl.create({
              title: 'Confirmer votre réservation',
              message: 'si vous confirmez votre réservation, vous allez attendre de la confirmation du conducteur , on va vous notifier dès réception d\'une réponse ',
              buttons: [
                {
                  text: 'retour',
                  role: 'cancel',
                  handler: () => {
                    
                  }
                },
                {
                  text: 'Confirmer',
                  handler: () => {
                    this.demand.reserver(emailOffer,idOffer,this.email,this.idDemand,this.NbPlaces).subscribe(data_reserve =>{
                      if(data.status){
                        this.appCtrl.getRootNav().setRoot(DashboardPage); 
    
                      }else{
                        window.alert("something went wrong")
                      }
                    })
                  }
                }
              ]
            });
            alert.present();
          }else{
            window.alert("not connected")
          }
        })
      }
    })
    /*
    this.auth.getSomeData().subscribe(data =>{
      if(data.status){
        let alert = this.alertCtrl.create({
          title: 'Confirmer votre réservation',
          message: 'si vous confirmez votre réservation, vous allez attendre de la confirmation du conducteur , on va vous notifier dès réception d\'une réponse ',
          buttons: [
            {
              text: 'retour',
              role: 'cancel',
              handler: () => {
                
              }
            },
            {
              text: 'Confirmer',
              handler: () => {
                this.demand.reserver(emailOffer,idOffer,this.email,this.idDemand,this.NbPlaces).subscribe(data_reserve =>{
                  if(data.status){
                    this.appCtrl.getRootNav().setRoot(DashboardPage); 

                  }else{
                    window.alert("something went wrong")
                  }
                })
              }
            }
          ]
        });
        alert.present();
      }else{
        window.alert("not connected")
      }
    })*/
    
  }
  ionViewDidLoad() {
  }

}
