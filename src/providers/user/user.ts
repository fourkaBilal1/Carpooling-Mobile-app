import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceProvider} from '../data-service/data-service'


interface userData{
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
interface MyNotificationResponse{
  "_id" : String,
  "email" : String,
	"password" : String,
	"nom" : String,
	"prenom" : String,
	"age" : String,
	"tel" : String,
  "sexe" : String,
  "notifications" : [NotificationType]
}
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
interface NotificationsType{
  user : MyNotificationResponse,
  success : Boolean,
  unseen : number
}
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  //URL : String = "http://10.0.2.2:1234" ;
  //URL : String = "http://localhost:1234" ;
  URL : String

  constructor(public dataS : DataServiceProvider ,public http: HttpClient) {
    console.log('Hello UserProvider Provider');
    this.URL = this.dataS.URL
    console.log("USER URL IS : ", this.URL)

  }
  getUserData(email){
    return this.http.post<userData>(this.URL+'/api/user/data',{
      email
    });
  }
  listMyNotifications(email){
    return this.http.post<NotificationsType>(this.URL+'/api/user/notification',{
      email
    });
  }
  getNumberOfNotifications(email){
    return this.http.post<Number>(this.URL+'/api/user/notificationNumber',{
      email
    });
  }
  AllnotificationsSeen(email){
    return this.http.post<Boolean>(this.URL+'/api/user/notificationSeen',{
      email
    });
  }
}
