import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceProvider} from '../data-service/data-service'


interface userType{"_id" : String,"email" : String,"password" : String,"nom" : String,"prenom" : String,"age" : String,"tel" : String,"sexe" : String,"cars": String,"demands": String ,"offers":offerType[] }
interface listMyOffersResponse{
  success: boolean,
  list: userType
}
interface listOfferResponse{
  success: boolean,
  list: [userType]
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
interface offerResponse {
  success: boolean,
  message: String
}

@Injectable()
export class OfferProvider {
  //URL : String = "http://10.0.2.2:1234" ;
  //URL : String = "http://localhost:1234" ;
  URL : String;

  constructor(public dataS : DataServiceProvider ,public http: HttpClient) {
    console.log('Hello OfferProvider Provider');
    this.URL = this.dataS.URL
    console.log("OFFER URL IS : ", this.URL)

  }


  listMyOffers(email){
    return this.http.post<listMyOffersResponse>(this.URL+"/api/listMyOffers",{
      email
    })
  }
  addOffer(email,From,To,NbPl,Prix,datetimepicker){
    return this.http.post<offerResponse>(this.URL+"/api/offer",{
      email,From,To,NbPl,Prix,datetimepicker
    })
  }
  cancelOffer(idOffer,emailOffer){
    return this.http.post<offerResponse>(this.URL+"/api/cancelOffer",{
      idOffer,emailOffer
    })
  }
  listerOffres(email,from,to,datetimepicker){
    return this.http.post<listOfferResponse>(this.URL+"/api/listOffer",{
      email,from,to,datetimepicker
    })
  }
  alreadyReserved(email){
    return this.http.post<[String]>(this.URL+"/api/offer/alreadyReserved",{
      email
    })
  }
  getCarCapacity(email){
    return this.http.post<number>(this.URL+"/api/car/capacity",{
      email
    })
  }
}
