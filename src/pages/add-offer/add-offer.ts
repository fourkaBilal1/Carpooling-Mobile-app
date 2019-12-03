import {  Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams,ViewController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { OfferProvider } from '../../providers/offer/offer';
import { ConducteurPage } from '../conducteur/conducteur';
import { Storage } from '@ionic/storage';


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
  selector: 'page-add-offer',
  templateUrl: 'add-offer.html',
})
export class AddOfferPage {
  From : String;
  To : String;
  nbPl : Number;
  Prix : number;
  FromF : String;
  ToF : String;
  NbPlacesF : Number;
  RsPlaces : Number;
  PrixF : number;
  time : String;
  date : String;
  dateTime : String;
  hist : offerType[] = [];
  invalidPrix : Boolean = false;
  invalidPlaces : Boolean = false;
  todayDate: String =  this.formatDate(new Date());
  maxDate: String =  this.formatDatemax(new Date());
  constructor(public storage: Storage ,private toastCtrl: ToastController,public appCtrl: App,public viewCtrl: ViewController,public offer: OfferProvider, public auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.hist = this.navParams.get("hist")
    this.date = this.formatDate(new Date())
    if(new Date().getHours().toString().length == 1){
      if(new Date().getMinutes().toString().length ==1){
        this.time = "0"+new Date().getHours().toString()+":"+"0"+new Date().getMinutes().toString()
      }else{
        this.time = "0"+new Date().getHours().toString()+":"+new Date().getMinutes().toString()
      }
    }else{
      if(new Date().getMinutes().toString().length ==1){
        this.time = new Date().getHours().toString()+":"+"0"+new Date().getMinutes().toString()
      }else{
        this.time = new Date().getHours().toString()+":"+new Date().getMinutes().toString()
      }
    }


    console.log("time is : " + this.time)

    this.storage.get("user").then((val)=>{
      if(val !="none" && val!=null ){
        this.auth.getSomeDatas(val).subscribe(data=>{
          if(data.status){
            this.offer.getCarCapacity(data.email).subscribe(carC =>{
              console.log(carC)
              this.RsPlaces = carC;
              console.log(this.RsPlaces)
            })
          }
    
        })
      }
    })



    /*
    this.auth.getSomeData().subscribe(data=>{
      if(data.status){
        this.offer.getCarCapacity(data.email).subscribe(carC =>{
          console.log(carC)
          this.RsPlaces = carC;
          console.log(this.RsPlaces)
        })
      }

    })*/

    



  }
  formatDate(date) {
    let d = new Date(date),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  formatDatemax(date) {
    let d = new Date(date),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear();
      year = year+2;
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  addOffer(event,form){
    
    
    var target = event.target
    this.From = target.From.value
    this.To = target.To.value
    this.Prix = target.Prix.value
    this.nbPl = new Number(target.NbPlaces.value)
    if(this.Prix < 0){
      this.invalidPrix = true
      let toast = this.toastCtrl.create({
        message: 'Le prix est incorrect',
        duration: 3000,
        position: 'top'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }else{
      //console.log("this.nbpl: ",this.nbPl,"  ,this.Rsplaces: ", this.RsPlaces)
      //console.log(" sentence : ", (this.RsPlaces < this.nbPl ))
      if((this.nbPl < 1) || (this.nbPl > this.RsPlaces)){
        console.log("we are here and i love u")
        this.invalidPlaces = true
        let toast = this.toastCtrl.create({
          message: 'Le nombre de places proposées est invalide',
          duration: 3000,
          position: 'top'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      }else{
        this.dateTime = this.date+"T"+this.time +":00.000+00:00"
  
        this.storage.get("user").then((val)=>{
          if(val !="none" && val!=null ){
            this.auth.getSomeDatas(val).subscribe(data =>{
              if(data.status){
                this.offer.addOffer(data.email,this.From,this.To,this.nbPl,this.Prix,this.dateTime).subscribe(datae =>{
                  if(datae.success){
                    
                    this.appCtrl.getRootNav().setRoot(ConducteurPage); 
                  }
                })
              }
            })
          }
        })
        /*
        this.auth.getSomeData().subscribe(data =>{
          if(data.status){
            this.offer.addOffer(data.email,this.From,this.To,this.nbPl,this.Prix,this.dateTime).subscribe(datae =>{
              if(datae.success){
                
                this.appCtrl.getRootNav().setRoot(ConducteurPage); 
              }
            })
          }
        })*/
      }


      
    }


    
  }
  itemTapped(event,item){
    this.FromF = item.From
    this.ToF = item.To
    this.NbPlacesF = item.NbPlaces
    this.PrixF = item.Prix
  }
  ionViewDidLoad() {
  }

}
