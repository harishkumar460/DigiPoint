import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() productInfo;
  showProductInfoFormError : boolean =false;
  constructor() { }

  

  public addProductToCart(productInfoForm : any){
  	this.showProductInfoFormError=false;
  	console.log('productInfo '+this.productInfo+' productDetails '+productInfoForm);
  	if(productInfoForm.controls.colorOptions.value && productInfoForm.controls.storageOptions.value &&
  	   productInfoForm.controls.qtyOptions.value ){

  	}else{
  		this.showProductInfoFormError=true;
  	}
  }

  ngOnInit() {
  	console.log('product details '+JSON.stringify(this.productInfo));
  }
  ngDoCheck(){
  	console.log('do check called');
  	this.showProductInfoFormError=false;
  }

}
