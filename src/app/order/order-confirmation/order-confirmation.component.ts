import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
public orderDetails;
  constructor(private cartService : CartService) { 
    this.orderDetails= this.cartService.getCart();
  }

  ngOnInit() {
   
  }
  ngOnDestroy(){
  	this.cartService.clearCart();
  }

}
