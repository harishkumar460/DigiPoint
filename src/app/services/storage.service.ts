import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

 private homeContent : {};
 private shippingAddress: {};
 private isLoggedIn: boolean = false;

 public setLoggedInStatus(loggedInStatus: boolean){
 	this.isLoggedIn=loggedInStatus;
 }

 public getLoggedInStatus(){
 	return this.isLoggedIn;
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

  constructor() { }
}
