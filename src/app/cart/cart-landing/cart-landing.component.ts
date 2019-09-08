import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-cart-landing',
  templateUrl: './cart-landing.component.html',
  styleUrls: ['./cart-landing.component.css']
})
export class CartLandingComponent implements OnInit {

  private cartDetails: any;
  public totalAmount: number=0;
  public qtyOptionsList=[1,2,3];
  public cartItemsUpdated: boolean=false;
  private closeResult: string;
  constructor(private cartService: CartService,
              private modalService: NgbModal) { }

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
    this.cartItemsUpdated=true;
    this.cartService.setCart(this.cartDetails);
    this.getTotalCartAmount();
    setTimeout(()=>{
      this.cartItemsUpdated=false;
    },3000);
  }
  public open(content) {
     this.cartDetails.totalAmount=this.totalAmount;
      this.cartService.setCart(this.cartDetails);
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',backdrop:'static'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

   public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
