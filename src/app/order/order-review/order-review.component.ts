import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.css']
})
export class OrderReviewComponent implements OnInit {
  public orderDetails;
  constructor(private cartService: CartService) {
    this.orderDetails=this.cartService.getCart();
   }
  
  ngOnInit() {

  }

}
