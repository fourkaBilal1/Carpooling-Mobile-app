import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'
import { AuthProvider } from '../../providers/auth/auth';
import { DemandsForOfferPage } from '../demands-for-offer/demands-for-offer';
import { PassagerPage } from '../passager/passager';
import { Storage } from '@ionic/storage';


interface NotificationType{
  _id : String,
  Description: String,
	TimeOfNotification :  Date ,
	Seen: Boolean,
	Type : String ,
	Responded : Boolean,
  Important : Boolean,
  timeInterval : String
}

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifications : NotificationType[] = []; 
  dateo : Date;
  email: String;
  constructor(public storage: Storage,public appCtrl: App ,public auth: AuthProvider ,public user: UserProvider, public navCtrl: NavController, public navParams: NavParams) {
    
    this.storage.get("user").then((val)=>{
      if(val !="none" && val!=null ){
        this.auth.getSomeDatas(val).subscribe(dt =>{
          if(dt.status){
            this.email = dt.email
            this.user.listMyNotifications(dt.email).subscribe(data =>{
              data.user.notifications.forEach(elem=>{
                elem.timeInterval = this.diffrDate(elem.TimeOfNotification)
              })
              
              this.notifications = data.user.notifications.reverse()
              this.user.AllnotificationsSeen(dt.email).subscribe(nt =>{
              })
            })
          }else{
          }
        })
      }
    })
    
    
    
    
    
    /* 
    this.auth.getSomeData().subscribe(dt =>{
      if(dt.status){
        this.email = dt.email
        this.user.listMyNotifications(dt.email).subscribe(data =>{
          data.user.notifications.forEach(elem=>{
            elem.timeInterval = this.diffrDate(elem.TimeOfNotification)
          })
          
          this.notifications = data.user.notifications.reverse()
          this.user.AllnotificationsSeen(dt.email).subscribe(nt =>{
          })
        })
      }else{
      }
    })
    */
  }
  diffrDate(dat){
    var todayDate = new Date();
    var date = new Date(dat)
    var res : String;
    if((todayDate.getFullYear() - date.getFullYear()) == 0 ){
      if( (todayDate.getDay()-date.getDay())==0){
        if( (todayDate.getHours() - date.getHours()) == 0 ){
          if((todayDate.getMinutes()-date.getMinutes())==0 ){
            res = "maintenant"
          }else{
            res = (String)(todayDate.getMinutes()-date.getMinutes())+" min"
          }
        }else{
          res = (String)(todayDate.getHours()-date.getHours())+" h"
        }
      }else{
        res = (String)(-todayDate.getDay()+date.getDay())+" d"
      }
    }else{
      res = (String)(-todayDate.getFullYear()+date.getFullYear())+" y"
    }


    return res
  }
  itemNotification($event,Type,idN){
    if(Type=="reservation"){
      this.navCtrl.push(DemandsForOfferPage,{
        idOffer : idN,
        email: this.email
      }); 
    }else if (Type=="accepted"){
      this.navCtrl.push(PassagerPage,{
        id : idN,
        email: this.email,
        selectedIndex : 1
      }); 
    }else if(Type=="rejected"){
      this.navCtrl.push(PassagerPage,{
        idOffer : idN,
        email: this.email,
        selectedIndex : 2
      }); 
    }
  }
  ionViewDidLoad() {
  }

}
