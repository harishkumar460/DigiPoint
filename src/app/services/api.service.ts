import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { }

  getApi(endPoint: string){
    return this.http.get(endPoint);
  }

  postCartDetails(cartDetails){
   
  }


}
