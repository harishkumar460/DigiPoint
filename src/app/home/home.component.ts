import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productList :[];
  contentData:{};
  constructor(private apiService: ApiService) {
    
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

  ngOnInit() {
   this.getContentData();
   this.getProductList();
  }

}
