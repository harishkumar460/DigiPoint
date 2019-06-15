import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../services/shared.service';
import { NgxUiLoaderService} from 'ngx-ui-loader';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

   productList :[];
   contentData:{};
   selectedProductInfo:{id:'test',name:'tester'};
   closeResult : string;
  constructor(private router:Router, private apiService: ApiService,
            private modalService: NgbModal,private activatedRoute : ActivatedRoute,
            private storageService: StorageService,private sharedService: SharedService,
             private ngxUiLoaderService: NgxUiLoaderService) {

             }

   getProductList(){
     this.ngxUiLoaderService.start();
     this.apiService.getApi('https://shiv-app.herokuapp.com/cellphones-list').
     subscribe(response=>{
       this.ngxUiLoaderService.stop();
       console.log(JSON.stringify(response));
      this.productList=response['cellPhonesList']; 
     });
   };

   public open(content) {
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

  showCounter(val){
    console.log('event value '+val);
  }

  ngOnInit() {
  	 this.getProductList();
  	 this.contentData=this.storageService.getHomeContent();
  }

}
