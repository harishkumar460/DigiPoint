import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-cart-landing',
  templateUrl: './cart-landing.component.html',
  styleUrls: ['./cart-landing.component.css']
})
export class CartLandingComponent implements OnInit {

  private cartDetails: any;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  	this.cartDetails=this.cartService.getCart();
  }
  public clearCart(){
  	this.cartDetails=null;
  	this.cartService.clearCart();
  }

}
