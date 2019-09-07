import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

 private homeContent : {};
 private shippingAddress: {};

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
