import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/cart.service';
import { MonthYearConstants, TaxRates } from '../../constants/app-constants';
import { Router, ActivatedRoute} from '@angular/router';
import { FormControl,FormGroup,Validators,AbstractControl,ValidationErrors,ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
export class OrderPaymentComponent implements OnInit {

  public shippingAddress: any;
  public paymentForm : FormGroup;
  public currentOrder : object;
  public monthYearConst: object;
  public yearsList:any;
  public changeDue:any;
  constructor(private storageService: StorageService,
  			  private cartService: CartService, private router: Router,
          private activatedRoute: ActivatedRoute) {
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

   /*public validateAmount(context) : ValidatorFn{
     return (control: AbstractControl): ValidationErrors =>{
     if(parseInt(control.value)< context.currentOrder && context.currentOrder['netPayAmount']){
      return {validate:false};
     }else{
      return {validate:true};
     }
    }
   }*/

   public updatePaymentMode(){

   	if(this.paymentForm.value.paymentMode==='card'){
      this.paymentForm.controls.cardForm.reset(); 
   	}else{
       this.changeDue=0;
       this.paymentForm.controls.cashForm.reset(); 
     }
   }

  ngOnInit() {
  	this.shippingAddress = this.storageService.getShippingAddress();
    let currentCart = this.cartService.getCart();
    currentCart.totalTax = (parseInt(currentCart.totalAmount) * TaxRates.gstRate)/100;
    currentCart.netPayAmount= currentCart.totalAmount+currentCart.totalTax;
    this.currentOrder=currentCart;
    this.cartService.setCart(currentCart);

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

  public checkEnteredAmount(){
    const enteredAmount=this.paymentForm.controls.cashForm.value.amount;
    this.changeDue= enteredAmount >= this.currentOrder['netPayAmount']? 
                                    (enteredAmount-this.currentOrder['netPayAmount'])+'':false; 
    if(!this.changeDue && this.changeDue!==0){
      this.paymentForm.controls.cashForm.setErrors({'lessAmount': true});
    }
  }

  public goToOrderReview(){
   this.router.navigate(['review'], {relativeTo: this.activatedRoute}).then(nav=>console.log('nav '+nav));   
  }

}
