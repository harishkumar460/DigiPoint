import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { SharedService } from '../services/shared.service';
import { Router, ActivatedRoute} from '@angular/router';
import { NgxUiLoaderService} from 'ngx-ui-loader';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contentData:{};
  itemsInCart:Number=0;
  constructor(private router:Router, private apiService: ApiService,
            private activatedRoute : ActivatedRoute,private storageService : StorageService,
            private sharedService : SharedService, private ngxUiLoaderService: NgxUiLoaderService) {
      this.sharedService.cartCounter.asObservable().subscribe((value: any) => {
        console.log('cart item listner '+value);
        this.itemsInCart=value;
    });
   }

  getContentData(){
    if(this.storageService.getHomeContent()){
       this.contentData=this.storageService.getHomeContent();
       this.navigateToLanding();
       return;
     }
     this.apiService.getApi('https://shiv-app.herokuapp.com/home-page-content').
     subscribe(response=>{
      response=JSON.parse(response['_body']);
      console.log(JSON.stringify(response));
      this.contentData=response; 
      this.storageService.setHomeContent(response);
      this.navigateToLanding();
     });
   };

   navigateToLanding(){
     this.router.navigate(['landing'],{ relativeTo: this.activatedRoute }).then(nav=>console.log('navigation '+nav));
   }

   

  ngOnInit() {
   this.getContentData();
 }

}
