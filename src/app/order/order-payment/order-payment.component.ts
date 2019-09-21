import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/cart.service';
import { MonthYearConstants } from '../../constants/app-constants';
import { FormControl,FormGroup,Validators } from '@angular/forms';
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
  public yearsList:any;
  constructor(private storageService: StorageService,
  			  private cartService: CartService) {
  	this.paymentForm= new FormGroup({
  		paymentMode: new FormControl('cash'),
  		cashForm: new FormGroup({amount: new FormControl(null,[Validators.required])}),
  		cardForm: new FormGroup({name: new FormControl(null,[Validators.required]),
  								 cardNumber: new FormControl(null,[Validators.required]),
  								 cvv: new FormControl(null,[Validators.required]),
  								 expiryMonth: new FormControl(null,[Validators.required]),
  								 expiryYear: new FormControl(null,[Validators.required])	
  							   })
  	});
   }

   public updatePaymentMode(){

   	if(this.paymentForm.value.paymentMode==='card'){
      this.paymentForm.controls.cardForm.reset(); 
   	}else{
       this.paymentForm.controls.cashForm.reset(); 
     }
   }

  ngOnInit() {
  	this.shippingAddress = this.storageService.getShippingAddress();
  	this.payableAmount = this.cartService.getCart().totalAmount;
  	this.monthYearConst=MonthYearConstants.months;
    this.populateYearList();
  }
  private populateYearList(){
    const yearConfig=MonthYearConstants.years;
    this.yearsList=[yearConfig.placeHolder];
    for(let i= yearConfig.startFrom; i<=yearConfig.offset;){
      this.yearsList.push(i++);
    }
  }

}
