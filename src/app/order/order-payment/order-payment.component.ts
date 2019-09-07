import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.css']
})
export class OrderPaymentComponent implements OnInit {

  public shippingAddress: any;
  constructor(private storageService: StorageService) {
   }

  ngOnInit() {
  	this.shippingAddress=this.storageService.getShippingAddress();
  }

}
