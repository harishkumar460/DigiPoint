import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/cart.service';
import { FormControl,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
export class OrderPaymentComponent implements OnInit {

  public shippingAddress: any;
  public paymentForm : FormGroup;
  public payableAmount : string;
  constructor(private storageService: StorageService,
  			  private cartService: CartService) {
  	this.paymentForm= new FormGroup({
  		paymentMode: new FormControl('cash'),
  		cashForm: new FormGroup({amount: new FormControl()}),
  		cardForm: new FormGroup({name: new FormControl(),
  								 cardNumber: new FormControl(),
  								 cvv: new FormControl(),
  								 expiryMonth: new FormControl(),
  								 expiryYear: new FormControl()	
  							   })
  	});
   }

  ngOnInit() {
  	this.shippingAddress = this.storageService.getShippingAddress();
  	this.payableAmount = this.cartService.getCart().totalAmount;
  }

}
