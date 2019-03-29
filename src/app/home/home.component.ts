import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contentData:{};
  constructor(private router:Router, private apiService: ApiService,
            private activatedRoute : ActivatedRoute,private storageService : StorageService) {
    
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
