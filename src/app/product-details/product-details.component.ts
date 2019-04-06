import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { CartService } from '../services/cart.service';
import { Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() productInfo;
  @Input() modal;
  showProductInfoFormError : boolean =false;
  showProductInfoFormSuccess : boolean =false;
  constructor(private sharedService :SharedService,private cartService :CartService,
    private router:Router,private activatedRoute : ActivatedRoute) {

   }

  

  public addProductToCart(productInfoForm : any){
    this.showProductInfoFormError=false;
    this.showProductInfoFormSuccess=false;
  	console.log('productInfo '+this.productInfo+' productDetails '+productInfoForm);
  	if(productInfoForm.controls.colorOptions.value && productInfoForm.controls.storageOptions.value &&
  	   productInfoForm.controls.qtyOptions.value ){
        let cartObject=this.cartService.getCart();
        let product={
          genericDetails:this.productInfo,
          color:productInfoForm.controls.colorOptions.value,
          capacity:productInfoForm.controls.storageOptions.value,
          quantity:productInfoForm.controls.qtyOptions.value
        }
        cartObject.items.push(product);
        this.cartService.setCart(cartObject);
        this.showProductInfoFormSuccess=true;

  	}else{
  		this.showProductInfoFormError=true;
  	}
  }

  navigateToCart(){
     this.router.navigate(['cart-page'],{ relativeTo: this.activatedRoute }).then(nav=>console.log('navigation '+nav));
   }

  ngOnInit() {
  	console.log('product details '+JSON.stringify(this.productInfo));
  }
  

}
