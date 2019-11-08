import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { CartObject, CartMethods } from '../interfaces/cart';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartObject: CartObject;
  constructor(private sharedService: SharedService) { }

  createNewCart(){
  
    var cartObj={
      cartId:this.createCartId(),
      items:[],
      totalAmount:0,
      netPayAmount:0,
      totalTax:0
      	
    }
    this.cartObject=cartObj;
    return cartObj;
  }

  display(){
    return 'test';
  }

  createCartId(){
  	let prefix='DGP';
  	let uniqueId=new Date().getTime();
  	return prefix+uniqueId;
  }
  
  getCart(){

   return this.cartObject?this.cartObject: this.createNewCart();
  }

  setCart(cartObj : CartObject){
  	this.cartObject=cartObj;
  	this.sharedService.cartCounter.next(this.cartObject.items.length);
  }
  clearCart(){
    this.cartObject=null;
    this.sharedService.cartCounter.next(0);
  }
}
