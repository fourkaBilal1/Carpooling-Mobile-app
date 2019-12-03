import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams,ViewController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DemandProvider } from '../../providers/demand/demand';
import { ListOffersPage } from '../list-offers/list-offers';
import { Storage } from '@ionic/storage';


interface demandType{
  "_id" : String,
  From: String,
	To: String,
	DateSys : Date ,
	Etat : String,
	DateDem : Date,
	NbPlaces : {type: Number, default : 0 },
	Prix : Number 
}


@IonicPage()
@Component({
  selector: 'page-add-demand',
  templateUrl: 'add-demand.html',
})
export class AddDemandPage {
  From : String;
  To : String;
  nbPl : Number;
  FromF : String;
  ToF : String;
  NbPlacesF : Number;
  Prix : Number;
  time : String;
  date : String;
  dateTime : String;
  invalidPlaces : boolean = false;
  hist : demandType[] = [];
  todayDate: String =  this.formatDate(new Date());
  maxDate: String =  this.formatDatemax(new Date());
  constructor(public storage: Storage,public toastCtrl: ToastController ,public appCtrl: App,public viewCtrl: ViewController,public demand: DemandProvider, public auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
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
    console.log(this.time)
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
  addDemand(event,form){
    var target = event.target
    this.From = target.From.value
    this.To = target.To.value
    this.nbPl = new Number(target.NbPlaces.value)
    console.log("nbpl: ", (this.nbPl <= 0  ))

    if(this.nbPl <= 0){
      this.invalidPlaces = true
      let toast = this.toastCtrl.create({
        message: 'Le nombre de places demandées est invalide',
        duration: 3000,
        position: 'top'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    }else{
      this.dateTime = this.date+"T"+this.time +":00.000+00:00"

      this.storage.get("user").then((val) => {
        if(val == 'none'){

        }else{
          this.auth.getSomeDatas(val).subscribe(data =>{
            if(data.status){
              this.demand.addDemand(data.email,this.From,this.To,this.dateTime,this.nbPl).subscribe(datae =>{
                if(datae.success){
                  this.demand.GetLastId(data.email).subscribe(dataLast => {
                    this.navCtrl.push(ListOffersPage,{
                      email :  data.email,
                      from: this.From,
                      to: this.To,
                      idDemand : dataLast.id,
                      NbPlaces : this.nbPl,
                      datetimepicker : this.dateTime
                    }) 
                  }) 
                }
              })
            }
          })
        }


      });


      /*
      this.auth.getSomeData().subscribe(data =>{
        if(data.status){
          this.demand.addDemand(data.email,this.From,this.To,this.dateTime,this.nbPl).subscribe(datae =>{
            if(datae.success){
              this.demand.GetLastId(data.email).subscribe(dataLast => {
                this.navCtrl.push(ListOffersPage,{
                  email :  data.email,
                  from: this.From,
                  to: this.To,
                  idDemand : dataLast.id,
                  NbPlaces : this.nbPl,
                  datetimepicker : this.dateTime
                }) 
              }) 
            }
          })
        }
      })
      */


    }




    
  }
  itemTapped(event,item){
    this.FromF = item.From
    this.ToF = item.To
    this.NbPlacesF = item.NbPlaces
  }
  ionViewDidLoad() {
  }

}
