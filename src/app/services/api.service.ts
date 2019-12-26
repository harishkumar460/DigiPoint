import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getApi(endPoint: string){
    return this.httpClient.get(endPoint);
  }

  postApi(endPoint: string, payload: any){
    return this.httpClient.post(endPoint,payload);
  }

  postCartDetails(cartDetails){
   
  }


}
