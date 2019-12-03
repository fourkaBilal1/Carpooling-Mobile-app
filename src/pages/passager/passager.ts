import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { DemandProvider } from '../../providers/demand/demand';
import { AuthProvider } from '../../providers/auth/auth';
import { AddDemandPage } from '../add-demand/add-demand';
import { DashboardPage } from '../dashboard/dashboard'
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
  selector: 'page-passager',
  templateUrl: 'passager.html',
})
export class PassagerPage {
  items : demandType[] = [];
  acceptedItems : demandType[] = [];
  rejectedItems : demandType[] = [];
  waitingItems  : demandType[] = [];
  canceledItems : demandType[] = [];
  finishedItems : demandType[] = [];
  visitedItems : demandType[] = [];
  cancelB: boolean;
  Page = DashboardPage; 
  email : String;
  SelectedI : number = 0;
  constructor(public storage: Storage,public appCtrl:App,public alertCtrl: AlertController , public auth : AuthProvider,public demand : DemandProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.SelectedI = this.navParams.get("selectedIndex")
    if(this.SelectedI == undefined){
      this.SelectedI = 0;
    }    


    this.storage.get("user").then((val)=>{
      if(val !="none" && val!=null ){
        this.auth.getSomeDatas(val).subscribe(res => {
          if(res.status){
            this.email = res.email
            this.demand.GetMyDemands(res.email).subscribe(data =>{
              if(data != undefined){
                  data.demands.reverse().forEach(element => {
                  if(element.Etat=="waiting"){
                    this.waitingItems.push(element)
                  }else if(element.Etat=="accepted"){
                    this.acceptedItems.push(element)
                  }else if(element.Etat=="rejected"){
                    this.rejectedItems.push(element)
                  }else if(element.Etat=="canceled"){
                    this.canceledItems.push(element)
                  }else if(element.Etat=="finished"){
                    this.finishedItems.push(element)
                  }
                  this.visitedItems.push(element)
                })
              }
            })
          }else{
            console.log("not connected")
            console.log("encore et encore")
          }
          
        })
      }
    })
    /*
    this.auth.getSomeData().subscribe(res => {
      if(res.status){
        this.email = res.email
        this.demand.GetMyDemands(res.email).subscribe(data =>{
          if(data != undefined){
              data.demands.reverse().forEach(element => {
              if(element.Etat=="waiting"){
                this.waitingItems.push(element)
              }else if(element.Etat=="accepted"){
                this.acceptedItems.push(element)
              }else if(element.Etat=="rejected"){
                this.rejectedItems.push(element)
              }else if(element.Etat=="canceled"){
                this.canceledItems.push(element)
              }else if(element.Etat=="finished"){
                this.finishedItems.push(element)
              }
              this.visitedItems.push(element)
            })
          }
        })
      }else{
        console.log("not connected")
        console.log("encore et encore")
      }
      
    })*/
  }
  cancelDemand($event,idDemand){
    let alert = this.alertCtrl.create({
      title: 'Confirmer l\'annulation',
      message: 'etes-vous sur d\'annuler cette demande?',
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
            this.demand.cancelDemand(idDemand).subscribe(dt=>{
              this.appCtrl.getRootNav().setRoot(PassagerPage);

          })
          }
        }
      ]
    });
    alert.present();
  }
  addDemandClicked(event){
    this.navCtrl.push(AddDemandPage,{
      "hist": this.visitedItems.reverse().slice(0,4)
    })
  }
  waiting(){
    this.cancelB = true;
    this.items = this.waitingItems
  }
  accepted(){
    this.cancelB = true;
    this.items = this.acceptedItems
  }
  rejected(){
    this.cancelB = false;
    this.items = this.rejectedItems
  }
  canceled(){
    this.cancelB = false;
    this.items = this.canceledItems
  }
  finished(){
    this.cancelB = false;
    this.items = this.finishedItems
  }
  ionViewDidLoad() {
  }
}
