import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

 private homeContent : {};
 private shippingAddress: {};
 private isLoggedIn: any = null;

 constructor() { }

 public setLoggedInStatus(loggedInStatus: any){
 	sessionStorage.setItem('isLoggedIn',loggedInStatus);
 }

 public getLoggedInStatus(){
 	return sessionStorage.getItem('isLoggedIn');
 }
 public clearSession(){
 	sessionStorage.removeItem('isLoggedIn');
 }

 public setHomeContent(content){
 	this.homeContent=content;
 }

 public getHomeContent(){
 	return this.homeContent;
 }
 public setShippingAddress(address){
 	this.shippingAddress=address;
 }

 public getShippingAddress(){
 	return this.shippingAddress;
 }

}
