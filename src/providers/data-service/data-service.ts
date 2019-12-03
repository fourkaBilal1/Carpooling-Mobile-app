import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
  public URL = "http://10.0.2.2:1234"
  //public URL = "http://localhost:1234"
  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }

}
