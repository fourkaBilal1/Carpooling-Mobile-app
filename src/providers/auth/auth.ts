import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { DataServiceProvider} from '../data-service/data-service'


interface myData {
  success: boolean,
  message: String
}

interface myDatas{
  email: String,
  status: boolean,
  quote: String
}
interface registerResponse {
  success: boolean,
  message: String
}
interface logoutStatus{
  success : boolean
}
@Injectable()
export class AuthProvider {
  //URL : String = "http://10.0.2.2:1234" ;
  //URL : String = "http://localhost:1234" ;
  URL : String;
  
  constructor(public dataS : DataServiceProvider ,public toastCtrl : ToastController ,public http: HttpClient,public platform: Platform) {
    console.log('Hello AuthProvider Provider');
    this.URL = this.dataS.URL
    console.log("AUTH URL IS : ", this.URL)
  }
  login(email,password){

    


    var APIUrl = '/api';
    if (this.platform.is('core') == true){
        APIUrl = 'http://localhost:1234/api';
    }else{
        APIUrl = 'http://localhost:1234/api';
    }
    return this.http.post<myData>( this.URL+'/api/login',{
      email,password
    })
  }
  logout(){
    return this.http.get<logoutStatus>(this.URL+"/api/logout")
  }
  logoutC(email){
    return this.http.post<logoutStatus>(this.URL+"/api/logoutC",{
      "email" : email
    })

  }
  getSomeData(){
    
    return this.http.get<myDatas>(this.URL+'/api/data');
  }
  getSomeDatas(email){
    
    return this.http.post<myDatas>(this.URL+'/api/datas',{
      "email" : email
    });
  }
  hasCar(email){
    return this.http.post<myData>(this.URL+'/api/user/hasCar',{
      email
    });
  }
  existingUser(email){
    return this.http.post<myData>(this.URL+'/api/user/exist',{
      email
    });
  }
  registerUserCond(nom,prenom,email,age,tel,sexe,password,carDescri,carPlaces,carMat){
    return this.http.post<registerResponse>(this.URL+"/api/register/Conductor",{
      nom,prenom,email,age,tel,sexe,password,carDescri,carPlaces,carMat
    })
  }
  registerUser(nom,prenom,email,age,tel,sexe,password){
    
    return this.http.post<registerResponse>(this.URL+"/api/register",{
      nom,prenom,email,age,tel,sexe,password
    })
  }
  addCar(email,car,carPlaces,carMat){
    return this.http.post<registerResponse>(this.URL+"/api/addCar",{
      email,car,carPlaces,carMat
    })

  }
}
