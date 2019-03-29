import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

 private homeContent : {};

 public setHomeContent(content){
 	this.homeContent=content;
 }

 public getHomeContent(){
 	return this.homeContent;
 }

  constructor() { }
}
