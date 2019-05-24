import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartObject: any;
  constructor(private sharedService: SharedService) { }

  createNewCart(){
  
    var cartObj={
      cartId:this.createCartId(),
      items:[],
      totalAmount:'',
      totalTax:''
      	
    }
    this.cartObject=cartObj;
    return cartObj;
  }

  createCartId(){
  	let prefix='DGP';
  	let uniqueId=new Date().getTime();
  	return prefix+uniqueId;
  }

  getCart(){

   return this.cartObject?this.cartObject: this.createNewCart();
  }

  setCart(cartObj){
  	this.cartObject=cartObj;
  	this.sharedService.cartCounter.next(this.cartObject.items.length);
  }
  clearCart(){
    this.cartObject=null;
    this.sharedService.cartCounter.next(0);
  }
}
