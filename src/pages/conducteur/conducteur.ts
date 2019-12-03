import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { OfferProvider } from '../../providers/offer/offer';
import { DemandsForOfferPage } from '../demands-for-offer/demands-for-offer';
import { AddOfferPage } from '../add-offer/add-offer';
import { DashboardPage } from '../dashboard/dashboard';
import { AddCarPage } from '../add-car/add-car';
import { Storage } from '@ionic/storage';



/**
 * Generated class for the ConducteurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  selector: 'page-conducteur',
  templateUrl: 'conducteur.html',
})
export class ConducteurPage {
  items : offerType[] = [];
  email : String;
  progressItems : offerType[] = [];
  canceledItems : offerType[] = [];
  finishedItems : offerType[] = [];
  visitedItems : offerType[] = [];
  cancelB: boolean;

  Page = DashboardPage; 
  constructor(public storage: Storage,public appCtrl:App,public alertCtrl : AlertController ,public auth : AuthProvider,public offer :OfferProvider,public navCtrl: NavController, public navParams: NavParams) {
    /*
    this.storage.get("user").then((val)=>{
      if(val !="none" && val!=null ){

      }
    })
    */
    this.storage.get("user").then((val)=>{
      if(val !="none" && val!=null ){
        this.auth.getSomeDatas(val).subscribe(res => {
          this.email = res.email
          this.offer.listMyOffers(res.email).subscribe(data => {
            data.list.offers.reverse().forEach(element =>{
              if(element.Etat=="untreated" || element.Etat=="progress"){
                this.progressItems.push(element)
              }else if(element.Etat=="canceled"){
                this.canceledItems.push(element)
              }else if(element.Etat=="finished"){
                this.finishedItems.push(element)
              }
              this.visitedItems.push(element)
              
            })
          })
        })
      }
    })


    /*
    this.auth.getSomeData().subscribe(res => {
      this.email = res.email
      this.offer.listMyOffers(res.email).subscribe(data => {
        data.list.offers.reverse().forEach(element =>{
          if(element.Etat=="untreated" || element.Etat=="progress"){
            this.progressItems.push(element)
          }else if(element.Etat=="canceled"){
            this.canceledItems.push(element)
          }else if(element.Etat=="finished"){
            this.finishedItems.push(element)
          }
          this.visitedItems.push(element)
          
        })
      })
    })
    */
  }
  offerClick(event,id){
    this.navCtrl.push(DemandsForOfferPage,{
      "email" : this.email,
      "idOffer" : id
    })
  }
  cancelOffer(idOffer,emailOffer){
    let alert = this.alertCtrl.create({
      title: 'Confirmer l\'annulation',
      message: 'etes-vous sur d\'annuler cette offre?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.offer.cancelOffer(idOffer,emailOffer).subscribe(dt=>{
                this.appCtrl.getRootNav().setRoot(ConducteurPage);
            })
          }
        }
      ]
    });
    alert.present();
    
  }
  progress(){
    this.cancelB = true;
    this.items = this.progressItems
  }

  canceled(){
    this.cancelB = false;
    this.items = this.canceledItems
  }
  finished(){
    this.cancelB = false;
    this.items = this.finishedItems
  }
  addOfferClicked(event){
    this.auth.hasCar(this.email).subscribe(dt=>{
      if(dt.success){
        this.navCtrl.push(AddOfferPage,{
          "hist": this.visitedItems.reverse().slice(0,4)
        })
      }else{
        this.navCtrl.push(AddCarPage)
      }
    })
    
  }
  ionViewDidLoad() {    
  }

}
