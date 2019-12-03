import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceProvider} from '../data-service/data-service'



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
interface demandResponse {
  success: boolean,
  message: String,
  id : String
}
interface MydemandsResponse{
  "_id" : String,
  "email" : String,
	"password" : String,
	"nom" : String,
	"prenom" : String,
	"age" : String,
	"tel" : String,
  "sexe" : String,
  "demands" : [demandType] 
}
interface Reservations{
  success: boolean,
  listReservation: [Reservation]
}
interface Reservation{
  "_id":String,
  "DateSys": Date,
  "Etat":String,
  "emailOffer":String,
  "emailDemand":String,
  "idOffer":String,
  "idDemand":String,
  "NbPlaces":number
}

@Injectable()
export class DemandProvider {
  URL : String;
  //URL : String = "http://10.0.2.2:1234" ;
  //URL : String = "http://localhost:1234" ;

  constructor(public dataS : DataServiceProvider ,public http: HttpClient) {
    console.log('Hello DemandProvider Provider');
    this.URL = this.dataS.URL
    console.log(" DEMAND URL IS : ", this.URL)

  }
  GetMyDemands(email){
    return this.http.post<MydemandsResponse>(this.URL+"/api/GetMyDemands",{
      email
    })
  }
  getDemandsForOffer(idOffer){
    return this.http.post<Reservations>(this.URL+"/api/reservation/getReservations",{
      idOffer
    })
  }
  addDemand(email,From,To,datetimepicker,NbPlaces){
    return this.http.post<demandResponse>(this.URL+"/api/demand",{
      email,From,To,datetimepicker,NbPlaces
    })
  }
  GetLastId(email){
    return this.http.post<demandResponse>(this.URL+"/api/demand/last",{
      email
    })
  }
  reserver(emailOffer,idOffer,emailDemand,idDemand,NbPlaces){
    console.log("id dm : ", idDemand)
    return this.http.post<demandResponse>(this.URL+"/api/reservation",{
      emailOffer,idOffer,emailDemand,idDemand,NbPlaces
    })
  }
  acceptDemand(idReservation){
    return this.http.post<demandResponse>(this.URL+"/api/acceptDemand",{
      idReservation
    })
  }
  rejectDemand(idReservation){
    return this.http.post<demandResponse>(this.URL+"/api/rejectDemand",{
      idReservation
    })
  }
  cancelDemand(idDemand){
    return this.http.post<demandResponse>(this.URL+"/api/cancelDemand",{
      idDemand
    })
  }
}
