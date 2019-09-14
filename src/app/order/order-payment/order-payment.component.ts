import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/cart.service';
import { AppConstants } from '../../constants/app-constants';
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
  public monthYearConst: object;
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

   public updatePaymentMode(){

   	if(this.paymentForm.paymentMode.value==='card'){
      this.paymentForm.cardForm.expiryMonth.setValue(0);
   	}
   }

  ngOnInit() {
  	this.shippingAddress = this.storageService.getShippingAddress();
  	this.payableAmount = this.cartService.getCart().totalAmount;
  	this.monthYearConst=AppConstants.MonthYearConstants.months;
  }

}
