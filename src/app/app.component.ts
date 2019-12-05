import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myDemoApp';
  constructor(private router:Router, private storageService: StorageService){

  }
  ngOnInit(){
  let targetRout= this.storageService.getLoggedInStatus()? 'home-page' :'login-page';
  this.router.navigate([targetRout]).then(nav=>console.log('navigation '+nav));
  }
  
}
