import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productList :[];
  contentData:{};
  selectedProductInfo:{id:'test',name:'tester'};
  closeResult : string;
  constructor(private router:Router, private apiService: ApiService,private modalService: NgbModal) {
    
   }

   getProductList(){
     this.apiService.getApi('https://shiv-app.herokuapp.com/cellphones-list').
     subscribe(response=>{
      response=JSON.parse(response['_body']);
      console.log(JSON.stringify(response));
      this.productList=response['cellPhonesList']; 
     });
   };
   getContentData(){
     this.apiService.getApi('https://shiv-app.herokuapp.com/home-page-content').
     subscribe(response=>{
      response=JSON.parse(response['_body']);
      console.log(JSON.stringify(response));
      this.contentData=response; 
     });
   };

   navigateToProductDetails(){
     this.router.navigate(['product-details-page']).then(nav=>console.log('navigation '+nav));
   }

   public open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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


  ngOnInit() {
   this.getContentData();
   this.getProductList();
  }

}
