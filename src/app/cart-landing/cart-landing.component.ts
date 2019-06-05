import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-cart-landing',
  templateUrl: './cart-landing.component.html',
  styleUrls: ['./cart-landing.component.css']
})
export class CartLandingComponent implements OnInit {

  private cartDetails: any;
  public totalAmount: number=0;
  public qtyOptionsList=[1,2,3];
  constructor(private cartService: CartService) { }

  ngOnInit() {
  	this.cartDetails=this.cartService.getCart();
    this.getTotalCartAmount();
  }
  getTotalCartAmount(){
    this.totalAmount=0;
    for(let i=0;i<this.cartDetails.items.length;i++){
      let item=this.cartDetails.items[i];
      this.totalAmount+=this.getItemPrice(item.genericDetails.price)*item.quantity;
    }
  }
  private getItemPrice(price: any){
    var amount=price.split(' ')[1];
    return parseInt(amount);
  }
  public clearCart(){
  	this.cartDetails=null;
  	this.cartService.clearCart();
  }

  public removeItem(itemIndex: number ){
      this.cartDetails.items.splice(itemIndex,1);
      this.cartService.setCart(this.cartDetails);
       this.getTotalCartAmount();
  }

  public updateCartItems(){
    this.cartService.setCart(this.cartDetails);
    this.getTotalCartAmount();
  }

}
