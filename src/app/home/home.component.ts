import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productList :[];
  contentData:{};
  showMainContent=true;
  constructor(private router:Router, private apiService: ApiService) {
    
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
     this.showMainContent=false;
     this.router.navigate(['product-details-page']).then(nav=>console.log('navigation '+nav));
   }

  ngOnInit() {
   this.getContentData();
   this.getProductList();
  }

}
